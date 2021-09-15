export const getAuthinbrowser = () => localStorage.getItem('_tk_')

export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", data)

export { mobilenumber_validator} from './validator'

export {deliverydate, checkorderdate} from './date'

export {convertarraydatatoobjectdata, searchdatafilter} from './array operations'

export {SetAddressContext} from './contexts'

export {default as ScrollToTop} from './topscroll'

export {showmodalwithmessageandvariant} from './modal utility'

export {logouterros, Logoutuser, deleleteuseraccount, gotohome} from './user'