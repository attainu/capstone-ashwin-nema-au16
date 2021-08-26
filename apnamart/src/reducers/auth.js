import {setauth} from './../actionTypes'
import {setAuthinbrowser, getAuthinbrowser} from '../utils'

const initialstate = " "

const Auth = (state, action) => {
    state = getAuthinbrowser() || initialstate

    if (action.type === setauth) {
        setAuthinbrowser(action.payload)
        return action.payload
    }
    setAuthinbrowser(state)
    return state
}

export default Auth