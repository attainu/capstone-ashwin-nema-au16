import {setauth} from '../actionTypes'

export const authsetter = (data) => {
    return {type: setauth, payload:data}
}