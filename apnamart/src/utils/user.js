import { setprofile, authsetter, storeuserorderdata } from '../actions'
import { axiosinstance } from '../config'

export const logouterros = {
    "Token is not provided": true, "Please provide a valid token": true
}

const resetafterlogout = (dispatch) => {
    dispatch(authsetter(" "))
    dispatch(setprofile({}))
    dispatch(storeuserorderdata([]))
}

export const gotohome = (dispatch,time=2000) => {
    setTimeout(() => {
        resetafterlogout(dispatch)
    }, time )
}


export const logoutuser = (dispatch) => {
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