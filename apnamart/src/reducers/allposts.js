import { allposts } from "../actionTypes";
const initialState = []

const Allposts = (state, action) => {
    state = state || initialState
    if (action.type === allposts.list) {
        return action.payload
    }

    return state
}

export default Allposts