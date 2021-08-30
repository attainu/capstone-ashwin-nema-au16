import { combineReducers } from "redux";
import Itemslist from "./allitems";
import Category from "./category";
import Subcategory from "./subcategory";
import cartcount from "./cartcount";
import Auth from "./auth";
import Profile from "./profile";
import opacity from "./opacity";
import Usercoordinates from "./usercoordinates";
import Useraddress from "./useraddress";
import Cart from "./cartitems";
import CartPrice from "./cartprice";
import Mapstate from "./mapmountstate";

export default combineReducers({
    Itemslist,
    Category,
    Subcategory, 
    cartcount,
    Auth,
    Profile,
    opacity,
    Usercoordinates,
    Useraddress,
    Cart,
    CartPrice,
    Mapstate
})