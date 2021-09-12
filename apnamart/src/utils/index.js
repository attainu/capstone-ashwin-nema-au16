export const getAuthinbrowser = () => localStorage.getItem('_tk_')

export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", data)

export { mobilenumber_validator} from './validator'

export {deliverydate} from './deliverydate'

export {convertarraydatatoobjectdata, searchdatafilter} from './array operations'

export {SetAddressContext} from './contexts'

export {default as ScrollToTop} from './topscroll'

export {showmodalwithmessageandvariant} from './modal utility'