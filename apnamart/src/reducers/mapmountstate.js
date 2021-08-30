import {mapmountstate} from '../actionTypes'

const initialstate = "false"

const Mapstate = (state,action) => {
    state = state || initialstate

    if (action.type === mapmountstate) {
        return action.payload
    }

    return state
}

export default Mapstate