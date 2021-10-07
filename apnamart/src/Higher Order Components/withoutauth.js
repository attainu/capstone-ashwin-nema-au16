import { useSelector } from "react-redux"
import {PATHS} from '../config'
import { Redirect } from "react-router"

export const withoutAuthentication = (Component) => {
    return function NotloggeedinComponent(props) {
        const {Auth:{loginstate} } = useSelector(state =>state)
        return loginstate === false ? <Component {...props}  />   : <Redirect to={PATHS.HOME} />
}
}