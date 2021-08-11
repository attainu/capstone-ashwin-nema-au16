import {PATHS} from '../config'
import { Login } from '../containers/login'
import { Signup } from '../containers/signup'
import { Home } from '../containers/Home'

const routes = [
    {exact:true, path:PATHS.HOME, component:Home},
    {exact:true, path:PATHS.LOGIN, component:Login},
    {exact:true, path:PATHS.SIGNUP,component:Signup}
]

export default routes