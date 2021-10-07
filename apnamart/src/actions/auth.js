import {setuserloginauth, logoutuser} from '../actionTypes'
import { axiosinstance } from '../config'

export const authsetter = (data) => {
    const auth = { "Auth": data }
    axiosinstance.defaults.headers = auth
    return {type: setuserloginauth, payload:data}
}

export const logoutsetter = () => {
    const auth = {"Auth": " "}
    axiosinstance.defaults.headers = auth
    return {type:logoutuser, payload:" "}
}