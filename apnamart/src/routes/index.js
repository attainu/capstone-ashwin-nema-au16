import {PATHS} from '../config'
import { Login } from '../containers/login'
import { Signup } from '../containers/signup'
import { Home } from '../containers/Home'
import Product from '../containers/Product'

const routes = [
    {exact:true, path:PATHS.HOME, component:Home},
    {exact:true, path:PATHS.LOGIN, component:Login},
    {exact:true, path:PATHS.SIGNUP,component:Signup},
    {exact:true, path:PATHS.PRODUCT,component:Product}
]

export default routes