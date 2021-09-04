export const getAuthinbrowser = () => localStorage.getItem('_tk_')

export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", data)

export {email_validator, mobilenumber_validator} from './validator'

export {deliverydate} from './deliverydate'

export {covertarraytoobject} from './arraytoobject'