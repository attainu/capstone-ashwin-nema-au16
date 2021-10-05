import { setprofile, logoutsetter, authsetter, storeordercount } from '../actions'
import { setaddress } from '../actionTypes'
import {  PATHS } from '../config'

export const logouterros = {
    "Token is not provided": true, "Please provide a valid token": true
}

const resetafterlogout = (dispatch) => {
    dispatch(logoutsetter())
    dispatch(setprofile({}))
    dispatch(storeordercount(0))
    dispatch({ type: setaddress, payload: [] })
}

export const gotohome = (dispatch, time = 2000) => {
    setTimeout(() => {
        resetafterlogout(dispatch)
    }, time)
}

export const Logoutuser = (dispatch) => {
    resetafterlogout(dispatch)
}

export const saveuserdetailsinclientandredirect = (data,dispatch, history) => {
    const { Name, Email, Mobilenumber, Location, ordercount, token } = data
    dispatch(setprofile({ Name, Email, Mobilenumber, Location }))
    if (token !== undefined) {
        dispatch(authsetter(token))
    }
    if (ordercount !== undefined) {
        dispatch(storeordercount(ordercount))
    }
    if (history !== undefined) {
        history.push(PATHS.HOME)
    }
}


export const userisofflinemessage = "You are not online. Please check your Internet Connection and try again later"