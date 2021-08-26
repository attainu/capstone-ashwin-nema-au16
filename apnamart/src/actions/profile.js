import axios from "axios"
import { getprofile } from "../actionTypes"
import { getAuthinbrowser } from '../utils'
import { authsetter } from './auth'
// url: 'https://apna-mart.herokuapp.com/getprofile',
// url: 'http://localhost:3000/getprofile',
// url: 'http://localhost:5000/getprofile',
export const profile = () => (dispatch) => {
    const authvalue = getAuthinbrowser() || ""
    
    const auth = { "Auth": authvalue }
    return axios({
        method: 'post',
        url: 'http://localhost:5000/getprofile',
        data: {},
        headers: auth
    }).then(resp => {
        
        if (resp.data.error === "") {
            dispatch({ type: getprofile, payload: resp.data })
            return
        }
        
        dispatch(authsetter(" "))
    }).catch(()=> {
        console.log("Profile not fetched")
        console.log("Get profile request failed")
    } )
}