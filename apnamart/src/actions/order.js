import { newuserorder, canceluserorder, userorderdata } from '../actionTypes'
import { Logoutuser, logouterros } from '../utils'
import { axiosinstance } from '../config'

export const addnewordertoorderhistory = (orderdata) => ({ type: newuserorder, payload: orderdata })

export const changeorderstatustocancelled = (orderid) => ({ type: canceluserorder, payload: orderid })

export const storeuserorderdata = (userorders) => {
    const [{ totalData: orderdata, totalCount:[{ count }]  }] = userorders
    return { type: userorderdata, payload: { orderdata, count } }
}

export const setuserqueryorderdata = (currentpage, showmodalfunction) => (dispatch) => {
    const itemstobeskipped = (currentpage - 1) * 5
    axiosinstance.post(`/user/order/data/${itemstobeskipped}`).then(({ data }) => {
        const { error } = data

        if (logouterros[error] !== undefined) {
            Logoutuser()
            return
        }

        if (error !== undefined && showmodalfunction !== undefined) {
            showmodalfunction(true)
            return
        }

        const [{ totalData: orderdata }] = data
        dispatch({ type: userorderdata, payload: { orderdata } })
    }).catch(() => {
        if (showmodalfunction !== undefined) {
            showmodalfunction(true)
        }
    })
}