import { setprofile, logoutsetter } from '../actions'
import {setaddress, userorderdata} from '../actionTypes'
import { axiosinstance } from '../config'

export const logouterros = {
    "Token is not provided": true, "Please provide a valid token": true
}

const resetafterlogout = (dispatch) => {
    dispatch(logoutsetter())
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


export const userisofflinemessage = "You are not online. Please check your Internet Connection and try again later"