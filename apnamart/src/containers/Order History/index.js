import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { PATHS } from '../../config'
import {getuserprofile} from '../../actions'

const OrderHistory = ({ history }) => {
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.Profile)
    const Auth = useSelector(state => state.Auth)
    const userorders = useSelector(state => state.Userorderdata)
    console.log(userorders)
    useEffect(() => {
        if (Auth.length !== 1 && Object.keys(userprofile).length === 0) {
            dispatch(getuserprofile())
        }

        else if (Object.keys(userprofile).length === 0) {
            history.push(PATHS.HOME)
        }

        document.body.style.backgroundColor = "#f1f3f6"
        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [Auth.length, dispatch, history, userprofile])

    return (
        <>
         {
             Object.keys(userorders).length === 0 ? <> <h3 className="text-center">You have not placed any order yet</h3> </> :
             <></>
         }
        </>
    )
}

export default OrderHistory