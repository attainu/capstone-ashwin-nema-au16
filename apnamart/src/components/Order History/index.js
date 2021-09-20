import { useSelector, useDispatch } from "react-redux"
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css'
import './index.css'
import Pagination from '@mui/material/Pagination';
import { Alert } from 'react-bootstrap'
import { checkorderdate, makesubpath, orderstatusmesssages } from '../../utils'
import Button from '@mui/material/Button'
import { NotificationModal } from '../Notification Modal'
import { useEffect, useState } from 'react'
import { setuserqueryorderdata } from '../../actions'
import { PATHS } from '../../config'
import { Link } from "react-router-dom";

const OrderHistory = () => {
    const dispatch = useDispatch()
    const [modal, showmodal] = useState(false)
    const [page, changepage] = useState(1)
    const { count, orderdata } = useSelector(state => state.Userorderdata)
    const { products } = useSelector(state => state.Productsdata)
    const [isdataloaded, changedataloadedstate ] = useState(false)

    useEffect(() => {
        if (isdataloaded === false) {
            dispatch(setuserqueryorderdata(1, showmodal))
            changedataloadedstate(true)
        }
    }, [isdataloaded, changedataloadedstate.apply, dispatch])

    const getorderdata = (_, value) => {
        if (page !== value) {
            dispatch(setuserqueryorderdata(value, showmodal))
            changepage(value)
        }

    }

    const {notshipped, shipped, outfordelivery, delivered} = orderstatusmesssages
    return (
        <>
            {
                count === 0 ? <> <h3 className="text-center">You have not placed any order yet</h3> </> :
                    <>
                        <h3 className="text-center mb-3">My orders</h3>
                        <SimpleBar style={{ height: "60vh" }}>

                            {
                                orderdata.map((item, index) => {
                                    const { _id, CreatedAt, Status, OrderedItems, Price } = item
                                    const { deliverystatus, shippingdate, outfordeliverydate, deliverydate, orderplaceddate } = checkorderdate(CreatedAt)
                                    let currentstatusmessage = ""
                                    switch (deliverystatus) {
                                        case notshipped:
                                            currentstatusmessage = orderplaceddate
                                            break
                                        
                                        case shipped:
                                            currentstatusmessage = shippingdate
                                            break
                                        
                                        case outfordelivery:
                                            currentstatusmessage = outfordeliverydate
                                            break
                                        
                                        case delivered:
                                            currentstatusmessage = deliverydate
                                            break
                                        
                                        default:
                                            break
                                    }
                                    const randomitemindex = Math.floor(Math.random() * Object.keys(OrderedItems).length)
                                    const { name, image } = products[Object.keys(OrderedItems)[randomitemindex]]
                                    return (
                                        <div key={index} >
                                            <pre className="text-wrap">
                                                <Alert className="space-between " variant="warning">
                                                    <div>
                                                        <h6 className="lead">Order Status </h6>
                                                        {Status !== "Order cancelled" && <> 
                                                        <p>{deliverystatus} </p>
                                                        <p>{currentstatusmessage}</p>
                                                        </>}
                                                        {Status === "Order cancelled" && <p>Order cancelled </p>}
                                                        <div>
                                                            <img className="ordereditemimage" src={image} alt={name } />
                                                            {name}</div>

                                                    </div>
                                                    <div>
                                                        Total Items({Object.keys(OrderedItems).length})
                                                        <div>₹{Price}</div>
                                                        <Link to={{pathname:`${makesubpath(PATHS.ORDERDETAILS,_id)}`, state:item } } className="text-decoration-none text-white">

                                                            <Button className="w-100" variant="contained" color="primary">
                                                                View Details
                                                            </Button>

                                                        </Link>

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