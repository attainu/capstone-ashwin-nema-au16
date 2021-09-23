import { profile } from "../actionTypes"
import {  logoutsetter } from './auth'
import {axiosinstance} from '../config'
import {storeordercount} from './order'

export const getuserprofile = (Auth) => (dispatch) => {
    const auth = { "Auth": String(Auth)}
    axiosinstance.defaults.headers = auth

    axiosinstance.post("/user/profile").then(resp => {

        if (resp.data.error === "") {
            const {Name, Mobilenumber, Email, Location, ordercount} =  resp.data
            dispatch({ type: profile, payload: {Name, Mobilenumber, Email, Location} })
            dispatch(storeordercount(ordercount))
            return
        }
        dispatch(logoutsetter())
    }).catch((error)=> {
        console.log(error)
    } )
}

export const setprofile =  (profiledata) => ({type:profile,payload:profiledata})