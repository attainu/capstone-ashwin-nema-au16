import axios from "axios"
import { profile } from "../actionTypes"
import { getAuthinbrowser } from '../utils'
import { authsetter } from './auth'
// url: 'https://apna-mart.herokuapp.com/getprofile',
// url: 'http://localhost:3000/getprofile',
// url: 'http://localhost:5000/getprofile',
export const getuserprofile = () => (dispatch) => {
    const authvalue = getAuthinbrowser() || ""
    
    const auth = { "Auth": authvalue }
    return axios({
        method: 'post',
        url: 'http://localhost:5000/user/profile',
        data: {},
        headers: auth
    }).then(resp => {
        
        if (resp.data.error === "") {
            dispatch({ type: profile, payload: resp.data })
            return
        }
        
        dispatch(authsetter(" "))
    }).catch(()=> {
        console.log("Profile not fetched")
        console.log("Get profile request failed")
    } )
}

export const setprofile =  (profiledata) => ({type:profile,payload:profiledata})