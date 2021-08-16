import {carticonplus, carticonminus} from './../actionTypes'
const initialState = 0

const cartcount = (state, action) => {
    state = state || initialState

    switch (action.type) {
        case carticonplus:
            return state + 1
        
        case carticonminus:
            return state - 1
        
        default:
            return state
    }
}

export default cartcount