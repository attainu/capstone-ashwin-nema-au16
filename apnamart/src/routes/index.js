import {PATHS} from '../config'
import {Login, Signup, Home, Product, Subcategory, Profile, Usercart, CheckoutPage, Category, Orderhistorypage, Orderdetails, NotFound, FAQ, AboutMyself} from '../containers'

const routes = [
    {exact:true, path:PATHS.HOME, component:Home},
    {exact:true, path:PATHS.LOGIN, component:Login},
    {exact:true, path:PATHS.SIGNUP,component:Signup},
    {exact:true, path:PATHS.PRODUCT,component:Product},
    {exact:true, path:PATHS.SUBCATEGORY,component:Subcategory},
    {exact:true, path:PATHS.PROFILE,component:Profile},
    {exact:true, path:PATHS.CART,component:Usercart},
    {exact:true, path:PATHS.CHECKOUT,component:CheckoutPage},
    {exact:true, path:PATHS.CATEGORY,component:Category},
    {exact:true, path:PATHS.ORDERHISTORY,component:Orderhistorypage},
    {exact:true, path:PATHS.ORDERDETAILS,component:Orderdetails},
    {exact:true, path:PATHS.FAQ,component:FAQ},
    {exact:true, path:PATHS.ABOUT,component:AboutMyself},
    {exact:true, path:PATHS.NOTFOUND,component:NotFound}
]

export default routes