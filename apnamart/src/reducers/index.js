import { combineReducers } from "redux";
import Itemslist from "./allitems";
import Category from "./category";
import Subcategory from "./subcategory";


export default combineReducers({
    Itemslist,
    Category,
    Subcategory
})