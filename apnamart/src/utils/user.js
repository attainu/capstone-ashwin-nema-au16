import { setprofile, authsetter,  getuserprofile } from '../actions'
import {setaddress, userorderdata} from '../actionTypes'
import { axiosinstance, PATHS } from '../config'
import {getAuthinbrowser} from './auth'

export const logouterros = {
    "Token is not provided": true, "Please provide a valid token": true
}

const resetafterlogout = (dispatch) => {
    dispatch(authsetter(" "))
    dispatch(setprofile({}))
    dispatch({type:userorderdata, payload:[]})
    dispatch({ type: setaddress, payload: [] })
}

export const gotohome = (dispatch,time=2000) => {
    setTimeout(() => {
        resetafterlogout(dispatch)
    }, time )
}

export const Logoutuser = (dispatch) => {
    resetafterlogout(dispatch)
}

export const deleleteuseraccount = (dispatch, modaldisplayfunction) => {
    axiosinstance.delete("/user").then(({ data }) => {
        const {  error } = data
        if (error !== "" && error !== undefined) {
            modaldisplayfunction(true)
            gotohome(dispatch)
            return
        }
        resetafterlogout(dispatch)
    }).catch(() => {
        console.log("Error occurred while deleting user account")
    })
}

export const preventunauthorisedaccess = (dispatch, token) => {
    const auth = getAuthinbrowser()
    if (auth === " " || auth !== token) {
        console.log(auth === " ", "This condition is helping me")
        Logoutuser(dispatch)
        return
    }
    return true
}

export const checkisuserloggedin = (token) => {
    const verification = getAuthinbrowser() === " " && token === " " && getAuthinbrowser() === token
    return verification 
}

export const validateuserpageaccess = (dispatch, history, profile, auth) => {
    const validprofile = Object.keys(profile).length > 0
    if (!validprofile && auth !== " ") {
        dispatch(getuserprofile())
        return false
    } 
    if (!validprofile) {
        history.push(PATHS.HOME)
    }
    return validprofile
}