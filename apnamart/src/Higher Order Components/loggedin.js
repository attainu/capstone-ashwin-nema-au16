import { useSelector } from "react-redux"
import {PATHS} from '../config'
import { Redirect } from "react-router"
import { useEffect, useState, useContext} from 'react'
import {ProductsdataloadedContext} from '../utils'

export const withAuthentication = (Component) => {
    return function AuthenticatedComponent(props) {
        const {Profile, Productsdata:{products}, Auth:{loginstate} } = useSelector(state =>state)
        const isproductsdataloaded = useContext(ProductsdataloadedContext)
        const [showdata, changeloadedstate] = useState(Object.keys(Profile).length > 0 && Object.keys(products).length > 0)

        useEffect(() => {
            if (showdata === false && isproductsdataloaded === true) {
                changeloadedstate(true)
            }
        },[ products, changeloadedstate, isproductsdataloaded, showdata])

        return loginstate === true ? <>{showdata  && <Component {...props}  />  }  </>  : <Redirect to={PATHS.HOME} />
}
}