import { profile } from "../actionTypes"
import { getAuthinbrowser } from '../utils'
import { authsetter } from './auth'
import {axiosinstance} from '../config'
import {storeordercount} from './order'

export const getuserprofile = () => (dispatch) => {
    const auth = { "Auth": getAuthinbrowser() || "" }
    axiosinstance.defaults.headers = auth
    axiosinstance.post("/user/profile", {headers:auth}).then(resp => {
        if (resp.data.error === "") {
            const {Name, Mobilenumber, Email, Location, ordercount} =  resp.data

            dispatch({ type: profile, payload: {Name, Mobilenumber, Email, Location} })
            dispatch(storeordercount(ordercount))
            return
        }
        dispatch(authsetter(" "))
    }).catch((error)=> {
        console.log(error)
        console.log("Profile not fetched")
        console.log("Get profile request failed")
    } )
}

export const setprofile =  (profiledata) => ({type:profile,payload:profiledata})