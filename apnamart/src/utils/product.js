import {changecartstate, changecartprice} from '../actions'
import {showmodalwithmessageandvariant} from './modal utility'
const { add_new_item, remove_item, increase_item_count, decrease_item_count } = changecartstate

const Add_to_cart = (count, dispatch, CartPrice, price, _id,displaymodalfunction, message, messagesetter ) => {
    if (count === 20) {
        if (message !== undefined && messagesetter !== undefined && displaymodalfunction !== undefined) {
            showmodalwithmessageandvariant(displaymodalfunction, message,messagesetter)
            return
        }
        if (displaymodalfunction !== undefined) {
            displaymodalfunction(true)
        }
        return
    }
    dispatch(changecartprice(CartPrice + price))
    if (count === 0) {
        dispatch(add_new_item({ _id }))
        return
    }
    dispatch(increase_item_count(_id))
}

const Remove_from_cart = (count, dispatch, CartPrice, price, _id) => {
    dispatch(changecartprice(CartPrice - price))
    if (count === 1) {
        dispatch(remove_item(_id))
        return
    }
    dispatch(decrease_item_count(_id))
}

const Remove_from_cart_with_below_order_limit_message = (count, dispatch, CartPrice, price, _id,displaymodalfunction, message, messagesetter ) => {
    if (count === 1) {
        if (message !== undefined && messagesetter !== undefined && displaymodalfunction !== undefined) {
            showmodalwithmessageandvariant(displaymodalfunction, message,messagesetter)
            
        }
        return
    }
    dispatch(changecartprice(CartPrice - price))
    dispatch(decrease_item_count(_id))
}

export const Redirect = (history, link) => {
    history.push(`${link}`)
}

export const Add_Remove_Item_Button_Setter = (count, configuration, Addtocart, message) => {
    const newconfiguraion = [...configuration]
    newconfiguraion[0] = count

    if (message !== undefined) {
        newconfiguraion[6] = message
    }

    if (Addtocart === true) {
        Add_to_cart(...newconfiguraion)
        return
    }

    if (Addtocart === false) {
        Remove_from_cart_with_below_order_limit_message(...newconfiguraion)
        return
    }

    Remove_from_cart(...newconfiguraion)
}