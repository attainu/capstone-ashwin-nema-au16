import {add_item, remove_item} from '../actionTypes'

export const add_to_Cart = (data) => ({type:add_item, payload:data})

export const remove_from_cart = (data) => ({type:remove_item, payload:data})