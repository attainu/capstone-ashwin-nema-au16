import {changeopacity} from '../actionTypes'

const initialstate = 1

const opacity = (state, action) => {
    state = state || initialstate

    if (action.type === changeopacity){
        return action.payload
    }

    return state
}

export default opacity