import {cartitemscount} from './../actionTypes'
const {add_item, remove_item} = cartitemscount

const initialState = 0

const cartcount = (state, action) => {
    state = state || initialState

    switch (action.type) {
        case add_item:
            return state + 1

        case remove_item:
            return state - 1
        
        default:
            return state
    }
}

export default cartcount