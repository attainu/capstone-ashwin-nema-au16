import {setauth} from '../actionTypes'
import { axiosinstance } from '../config'

export const authsetter = (data) => {
    const auth = { "Auth": data }
    axiosinstance.defaults.headers = auth
    return {type: setauth, payload:data}
}