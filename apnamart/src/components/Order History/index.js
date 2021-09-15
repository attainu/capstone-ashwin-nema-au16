import { useSelector, useDispatch } from "react-redux"
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css'
import './index.css'
import Pagination from '@material-ui/lab/Pagination';
import { Alert } from 'react-bootstrap'
import { checkorderdate} from '../../utils'
import Button from '@material-ui/core/Button';
import {NotificationModal} from '../Notification Modal'
import {useState} from 'react'
import {setuserqueryorderdata} from '../../actions'

const OrderHistory = () => {
    const dispatch = useDispatch()
    const [modal, showmodal] = useState(false)
    const [page ,changepage] = useState(1)
    const { count, orderdata } = useSelector(state => state.Userorderdata)
    const {products} = useSelector(state => state.Productsdata)
    const getorderdata = (_, value) => {
        if (page !== value) {
            dispatch(setuserqueryorderdata(value, showmodal))
            changepage(value)
        }
        
    }

    return (
        <>
            {
                count === 0 ? <> <h3 className="text-center">You have not placed any order yet</h3> </> :
                    <>
                        <h3 className="text-center mb-3">My orders</h3>
                        <SimpleBar style={{ height: "60vh" }}>

                            {
                            orderdata.map((item, index) => {
                                const { createdAt, status, ordereditems, price } = item
                                const { deliverystatus } = checkorderdate(createdAt)

                                const {name, image} = products[Object.keys(ordereditems)[0]]
                                return (
                                    <div key={index} >
                                        <pre className="text-wrap">
                                            <Alert className="space-between " variant="warning">
                                                <div>
                                                    <h6 className="lead">Order Status </h6>
                                                    {status !== "Cancelled" && <p>{deliverystatus} </p>}
                                                    {status === "Cancelled" && <p>Order cancelled </p>}
                                                    <div>
                                                        <img className="ordereditemimage" src={image} alt={name && name} /> 
                                                        { name}</div>

                                                </div>
                                                <div>
                                                    Total Items({Object.keys(ordereditems).length})
                                                    <div>₹{price}</div>
                                                    <Button className="w-100" variant="contained" color="primary">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </Alert>
                                        </pre>
                                    </div>
                                )
                            })
                            }
                        </SimpleBar>
                        <div className="d-flex justify-content-center" >
                            <Pagination page={page} size="large" count={Math.ceil(count / 5)} color="primary" onChange={getorderdata} />
                        </div>
                        <NotificationModal show={modal} centered={true} currentmodalmessage="Sorry something went wrong order data could not be fetched" onHide={showmodal} alertvariant="danger" successmessage="" />
                    </>
            }
        </>
    )
}

export default OrderHistory