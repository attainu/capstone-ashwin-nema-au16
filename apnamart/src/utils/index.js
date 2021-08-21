// export const getAuthinbrowser = () => JSON.parse(localStorage.getItem('_tk_'))

export const getAuthinbrowser = () => localStorage.getItem('_tk_')
// export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", JSON.stringify(data))
export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", data)
export {email_validator, mobilenumber_validator} from './validator'