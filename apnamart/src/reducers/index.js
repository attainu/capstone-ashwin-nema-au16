import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import Auth from "./auth";
import Profile from "./profile";
import Useraddress from "./useraddress";
import Cart from "./cart";
import CartPrice from "./cartprice";
import Productsdata from "./data";
import Userorderdata from "./userorders";

const persistConfig = {
    key:'root',
    storage,
    whitelist:['CartPrice', 'Cart', 'Auth']
}

const rootReducer = combineReducers({
    Auth,
    Profile,
    Useraddress,
    Cart,
    CartPrice,
    Productsdata,
    Userorderdata,
})

export default persistReducer(persistConfig, rootReducer)