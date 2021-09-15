import { setprofile, authsetter, storeuserorderdata } from '../actions'
import {setaddress} from '../actionTypes'
import { axiosinstance } from '../config'
import { useDispatch } from 'react-redux'

export const logouterros = {
    "Token is not provided": true, "Please provide a valid token": true
}

const resetafterlogout = (dispatch) => {
    dispatch(authsetter(" "))
    dispatch(setprofile({}))
    dispatch(storeuserorderdata([]))
    dispatch({ type: setaddress, payload: [] })
}

export const gotohome = (dispatch,time=2000) => {
    setTimeout(() => {
        resetafterlogout(dispatch)
    }, time )
}

export const Logoutuser = () => {
    const dispatch = useDispatch()
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