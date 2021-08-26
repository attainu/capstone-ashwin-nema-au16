import {cart} from '../actionTypes'
const {add_to_cart, remove_from_cart} = cart

const initialstatae = {}

const Cart = (state, action) => {
    state = state || initialstatae

    switch (action.type) {
        case add_to_cart:
            state[action.payload] = true
            break
        
        case remove_from_cart:
            delete state[action.payload]
            return state
    
        default:
            return state
    }

    return state
}

export default Cart