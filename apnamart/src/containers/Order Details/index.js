import { useState, useEffect  } from "react"
import { useSelector, useDispatch } from "react-redux"
import {validateuserpageaccess} from '../../utils'

export const Orderdetails = ({location:{state}, history}) => {
    const dispatch = useDispatch()
    const {Profile, Auth} = useSelector(state => state)
    const orderdetails = useState(state)
    
    useEffect(() => {
        validateuserpageaccess(dispatch, history, Profile, Auth)
    }, [history, dispatch, Profile, Auth])
    
    return (
        <>
        {
            orderdetails !== undefined &&
            <>
            </>
        }
        </>
    )
}