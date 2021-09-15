import  {userorderdata ,newuserorder, canceluserorder } from '../actionTypes'
const initialstate = {count:0, orderdata:[]}

const Userorderdata = (state, action) => {
    state = state || initialstate
    
    switch  (action.type) {
        
        case userorderdata:
            state = {...state, ...action.payload}
            return state

        case newuserorder:
            if (state.orderdata.length === 5) {
                state.orderdata.pop()
            }
            state.count += 1
            state.orderdata = [...action.payload, ...state.orderdata]
            return state
        
        case canceluserorder:
            state.orderdata[action.payload].status = "Order cancelled"
            return state 

        default:
            return state
    }
}

export default Userorderdata