import {changecartstate, changecartprice} from '../actions'
import {showmodalwithmessageandvariant} from './modal utility'
const { add_new_item, remove_item, increase_item_count, decrease_item_count } = changecartstate

const Add_to_cart = (count, dispatch, CartPrice, price, _id,displaymodalfunction, name, productnamechanger ) => {
    if (count === 20) {
        if (name !== undefined && productnamechanger !== undefined && displaymodalfunction !== undefined) {
            showmodalwithmessageandvariant(displaymodalfunction, name,productnamechanger)
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

export const Redirect = (history, link) => {
    history.push(`${link}`)
}

export const Add_Remove_Item_Button_Setter = (count, configuration, Addtocart) => {
    const newconfiguraion = [...configuration]
    newconfiguraion[0] = count

    if (Addtocart !== undefined) {
        Add_to_cart(...newconfiguraion)
        return
    }
    Remove_from_cart(...newconfiguraion)
}