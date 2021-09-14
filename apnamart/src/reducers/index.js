import { combineReducers } from "redux";
import Auth from "./auth";
import Profile from "./profile";
import Useraddress from "./useraddress";
import Cart from "./cart";
import CartPrice from "./cartprice";
import Productsdata from "./data";
import Userorderdata from "./userorders";

export default combineReducers({
    Auth,
    Profile,
    Useraddress,
    Cart,
    CartPrice,
    Productsdata,
    Userorderdata
})