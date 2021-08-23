import {setaddress} from '../actionTypes'

const inititalstate = []

const Useraddress = (state, action) => {
    state = state || inititalstate
    if (action.type === setaddress) {
        return action.payload
    }
    return state
}

export default Useraddress