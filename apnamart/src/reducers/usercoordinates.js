import {setcoordinates} from '../actionTypes'

const initialstate = []

const Usercoordinates = (state, action) => {
    state =  state || initialstate
    if (action.type === setcoordinates) {
        return action.payload
    }

    return state
}

export default Usercoordinates