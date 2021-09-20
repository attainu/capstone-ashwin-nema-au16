import { newuserorder, canceluserorder, userorderdata, userordercount } from '../actionTypes'
import { Logoutuser, logouterros } from '../utils'
import { axiosinstance } from '../config'

export const addnewordertoorderhistory = (orderdata) => ({ type: newuserorder, payload: orderdata })

export const changeorderstatustocancelled = (orderid) => ({ type: canceluserorder, payload: orderid })

export const setuserqueryorderdata = (currentpage, showmodalfunction) => (dispatch) => {
    const itemstobeskipped = (currentpage - 1) * 5
    axiosinstance.post(`/user/order/data/${itemstobeskipped}`).then(({ data }) => {
        const { error } = data

        if (logouterros[error] !== undefined) {
            Logoutuser(dispatch)
            return
        }

        if (error !== undefined && showmodalfunction !== undefined) {
            showmodalfunction(true)
            return
        }
        dispatch({ type: userorderdata, payload: data  })
    }).catch(() => {
        if (showmodalfunction !== undefined) {
            showmodalfunction(true)
        }
    })
}

export const storeordercount = (countdata) => {
    const [{count}] = countdata
    return {type:userordercount, payload:count } 
}