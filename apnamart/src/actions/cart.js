import {cartstate} from '../actionTypes'
const {new_item, delete_item, increase_item, decrease_item} = cartstate

export const changecartstate = {
    add_new_item:(item) => ({type:new_item, payload:item}),
    remove_item:(item) => ({type:delete_item, payload:item}),
    increase_item_count:(item) => ({type:increase_item, payload:item} ),
    decrease_item_count:(item) => ({type:decrease_item, payload:item})
}