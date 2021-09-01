import {cartprice} from '../actionTypes'

const initialstate = 0

const CartPrice = (state, action) => {
    state = state || initialstate

    if (action.type === cartprice) {
        return action.payload
    }

    return state
}

export default CartPrice