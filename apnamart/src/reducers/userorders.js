import  {userorderdata ,newuserorder, canceluserorder } from '../actionTypes'
const initialstate = {}

const Userorderdata = (state, action) => {
    state = state || initialstate

    switch  (action) {
        case userorderdata:
            return action.payload
        
        case newuserorder:
            return {...state, ...action.payload}
        
        case canceluserorder:
            state[action.payload].status = "Order cancelled"
            return state 

        default:
            return state
    }
}

export default Userorderdata