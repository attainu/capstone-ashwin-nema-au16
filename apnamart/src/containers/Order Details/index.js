import { useState, useEffect  } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosinstance, PATHS } from "../../config"
import {validateuserpageaccess} from '../../utils'
import { useParams } from "react-router"

export const Orderdetails = ({location:{state}, history}) => {
    const dispatch = useDispatch()
    const { orderid } = useParams()
    console.log(orderid)
    const {Profile, Auth} = useSelector(state => state)
    const [orderdetails, changeorderdetails] = useState(state)
    console.log(state)
    useEffect(() => {
        const ispageaccessvalid = validateuserpageaccess(dispatch, history, Profile, Auth)
        if ( orderdetails === undefined && ispageaccessvalid) {
            axiosinstance.post(`/user/order/orderdetails/${orderid}`).then(({data}) => {
                console.log(data[0])
                changeorderdetails(data[0])
            } ).catch(() => {
                history.push(PATHS.NOTFOUND)
            })
        }
    }, [history, dispatch, Profile, Auth,  orderid, changeorderdetails, orderdetails])
    
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