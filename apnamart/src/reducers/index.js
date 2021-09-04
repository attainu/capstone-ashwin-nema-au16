import { combineReducers } from "redux";
import Auth from "./auth";
import Profile from "./profile";
import opacity from "./opacity";
import Usercoordinates from "./usercoordinates";
import Useraddress from "./useraddress";
import Cart from "./cart";
import CartPrice from "./cartprice";
import Productsdata from "./data";

export default combineReducers({
    Auth,
    Profile,
    opacity,
    Usercoordinates,
    Useraddress,
    Cart,
    CartPrice,
    Productsdata
})