import {setauth} from './../actionTypes'

const initialstate = " "

const Auth = (state, action) => {
    state = state || initialstate

    if (action.type === setauth) {

        return action.payload
    }
    return state
}

export default Auth