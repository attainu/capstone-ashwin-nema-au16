import { profile } from "../actionTypes"
import { getAuthinbrowser } from '../utils'
import { authsetter } from './auth'
import {axiosinstance} from '../config'

export const getuserprofile = () => (dispatch) => {
    const auth = { "Auth": getAuthinbrowser() || "" }
    axiosinstance.defaults.headers = auth
    axiosinstance.post("/user/profile", {headers:auth}).then(resp => {
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