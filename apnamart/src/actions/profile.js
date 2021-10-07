import { profile } from "../actionTypes"
import {  logoutsetter } from './auth'
import {axiosinstance} from '../config'
import {saveuserdetailsinclientandredirect} from '../utils'

export const getuserprofile = (Auth) => (dispatch) => {
    const auth = { "Auth": String(Auth)}
    axiosinstance.defaults.headers = auth

    axiosinstance.post("/user/profile").then(resp => {

        if (resp.data.error === "") {
            saveuserdetailsinclientandredirect(resp.data, dispatch)
            return
        }
        dispatch(logoutsetter())
    }).catch((error)=> {
        console.log(error)
    } )
}

export const setprofile =  (profiledata) => ({type:profile,payload:profiledata})