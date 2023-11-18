import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants.js"
import axios from "axios";
import { logout } from "./usersActions.js";

export const ListProduct = (keyword=" ") => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(`https://backend6-nkj1.onrender.com/api/products?keyword=${keyword}`);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });
    }
};

//SINGLE PRODUCT
export const ListProductDetails  = (id) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`https://backend6-nkj1.onrender.com/api/products/${id}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });
    }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
    (productId,review) => async (dispatch,getState)=>{
        try {
            dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST});
            const{
                userLogin :{userInfo},
            } = getState();
            const config = {
                headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`,
            },
        };
        await axios.post(
            `https://backend6-nkj1.onrender.com/api/products/${productId}/review`,
            review,
            config
        );
        dispatch({type : PRODUCT_CREATE_REVIEW_SUCCESS});
        } catch (error) {
            const message =
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if (message === "NOT authorized,token failed") {
                dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
};
