import {getprofile} from '../actionTypes'

const initialstate = {}

const Profile = (state, action) => {
    state = state || initialstate

    if (action.type === getprofile) {
        return action.payload
    }

    return state
}

export default Profile