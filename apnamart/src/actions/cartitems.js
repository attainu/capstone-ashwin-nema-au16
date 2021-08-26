import {cart} from '../actionTypes'
const {add_to_cart, remove_from_cart, change_price} = cart

export const changecartstate = {
    new_item:(item) => ({type:add_to_cart, payload:item}),
    remove_cart_item:(item) => ({type:remove_from_cart, payload:item}),
    new_price:(price) => ({type:change_price, payload:price})
}