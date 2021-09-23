import { setuserloginauth, logoutuser } from './../actionTypes'

const initialstate = { authtoken: " ", loginstate: false }

const Auth = (state, action) => {
    state = state || initialstate

    switch (action.type) {
        case setuserloginauth:
            state = { authtoken: action.payload, loginstate: true }
            return state
        case logoutuser:
            state = { authtoken: action.payload, loginstate: false }
            return state
        default:
            return state
    }
}

export default Auth