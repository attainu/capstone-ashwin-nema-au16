import {cartstate} from '../actionTypes'
const {new_item, delete_item, increase_item, decrease_item} = cartstate

const initialstate = {}

const Cart = (state, action) => {
    state = state || initialstate
    const newcart = {...state}
    switch (action.type) {
        case new_item:
            newcart[action.payload.itemname] = {count:1, price:action.payload.price}
            return newcart
        
        case delete_item:
            delete newcart[action.payload]
            return newcart
        
        case increase_item:
            newcart[action.payload].count = newcart[action.payload].count + 1
            return newcart
        
        case decrease_item:
            newcart[action.payload].count = newcart[action.payload].count - 1
            return newcart
        
        default:
            return state
    }
}

export default Cart