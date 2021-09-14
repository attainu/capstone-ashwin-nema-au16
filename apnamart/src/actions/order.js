import {newuserorder, canceluserorder, userorderdata} from '../actionTypes'
import {convertarraydatatoobjectdata} from '../utils'

export const addnewordertoorderhistory = (orderdata) => ({type:newuserorder, payload:orderdata})

export const changeorderstatustocancelled = (orderid) => ({type:canceluserorder, payload:orderid})

export const storeuserorderdata = (userorders) => {
    const convertedorders = convertarraydatatoobjectdata(userorders) 
    return {type:userorderdata, payload:convertedorders}
}