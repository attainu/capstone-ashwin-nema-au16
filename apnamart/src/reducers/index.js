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
import Mapmountstate from "./mapmountstate";

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
    Mapmountstate
})