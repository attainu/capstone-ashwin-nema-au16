import { userorderdata, userordercount } from '../actionTypes'
import { Logoutuser, logouterros, showmodalwithmessageandvariant } from '../utils'
import { axiosinstance } from '../config'


export const setuserqueryorderdata = (currentpage, showmodalfunction, messagesetter) => (dispatch) => {
    const itemstobeskipped = (currentpage - 1) * 5
    axiosinstance.post(`/user/order/data/${itemstobeskipped}`).then(({ data }) => {
        const { error } = data
        if (logouterros[error] !== undefined) {
            Logoutuser(dispatch)
            return
        }
        dispatch({ type: userorderdata, payload: data })
    }).catch(() => {
        if (showmodalfunction !== undefined && messagesetter !== undefined) {
            showmodalwithmessageandvariant(showmodalfunction,"Sorry something went wrong. Your data could not be loaded. Please try again later", messagesetter)
        }
    })
}

export const storeordercount = (countdata) => {
    if (Array.isArray(countdata) === true) {
        if (countdata.length === 0) {
            return { type: userordercount, payload: 0 }
        }
        const [{ count }] = countdata
        return { type: userordercount, payload: count }
    }
    return { type: userordercount, payload: countdata }
}