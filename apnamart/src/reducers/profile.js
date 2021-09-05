import {profile} from '../actionTypes'

const initialstate = {}

const Profile = (state, action) => {
    state = state || initialstate

    if (action.type === profile) {
        return action.payload
    }

    return state
}

export default Profile