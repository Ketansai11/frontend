import { createStore,combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools } from "redux-devtools-extension";
import { productCreateReviewReducer, productDetailsReducer, productListReducer } from "./Reducers/ProductReducers.js";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/userReducers.js";

const reducer =combineReducers({
    productList : productListReducer,
    productDetails:productDetailsReducer,
    productReviewCreate:productCreateReviewReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,

});
//login
const userInfoFromLocalStorage =  localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;


const initialState={
    userLogin:{userInfo:userInfoFromLocalStorage},
};

const Middleware =[thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;