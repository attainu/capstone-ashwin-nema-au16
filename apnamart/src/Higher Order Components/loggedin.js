import { useSelector } from "react-redux"
import {PATHS} from '../config'
import { Redirect } from "react-router"
import { useEffect, useState} from 'react'

export const withAuthentication = (Component) => {
    return function AuthenticatedComponent(props) {
        const {Profile, Productsdata:products, Auth:{loginstate} } = useSelector(state =>state)
        const [dataloadedstate, changedataloadedstate] = useState(Object.keys(products) > 0)

        useEffect(() => {
            if (dataloadedstate === false && Object.keys(products).length > 0) {
                setTimeout(() => {
                    changedataloadedstate(true)
                }, 400);
            }
        },[dataloadedstate, products, changedataloadedstate])

        return loginstate === true ? <>{Object.keys(Profile).length > 0 && dataloadedstate  && <Component {...props}  />    } </>  : <Redirect to={PATHS.HOME} />
}
}