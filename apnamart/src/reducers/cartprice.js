import {cart} from '../actionTypes'
const {change_price} = cart

const initialstate = 0

const CartPrice = (state, action) => {
    state = state || initialstate

    if (action.type === change_price) {
        return action.payload
    }

    return state
}

export default CartPrice