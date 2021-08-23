import {changemapstate} from '../actionTypes'

const initialstate = "Not mounted"

const Mapmountstate = (state, action) => {
    state = state || initialstate

    if (action.type === changemapstate) {
        return action.payload
    }
    return state
}

export default Mapmountstate