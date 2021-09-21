import  {userorderdata , userordercount } from '../actionTypes'
const initialstate = {count:0, orderdata:[]}

const Userorderdata = (state, action) => {
    state = state || initialstate
    const {count} = state
    switch  (action.type) {
        
        case userordercount:
            state = {count:action.payload, orderdata:[]}
            return state

        case userorderdata:
            state = {count,orderdata: action.payload}
            return state

        default:
            return state
    }
}

export default Userorderdata