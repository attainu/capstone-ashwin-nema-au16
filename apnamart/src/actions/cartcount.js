import {cartitemscount} from '../actionTypes'
const {add_item, remove_item} = cartitemscount

export const changeitemcountincart = {
    increase_count:() => ({type:add_item}),
    decrease_count:() => ({type:remove_item})
}
