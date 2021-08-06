import { post } from "../actionTypes";

const initialstate = {}

const Post = (state, action) => {
    state = state || initialstate
    if (action.type === post) {
        return action.payload
    }
    return state
}


export default Post