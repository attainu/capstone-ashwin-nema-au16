import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import {changecartstate, changecartprice} from '../../actions'
import { Modal, Alert } from 'react-bootstrap'
import { PATHS } from '../../config'
import { Link } from 'react-router-dom'
import {deliverydate, showmodalwithmessageandvariant, hidemodal } from '../../utils'
import { useState } from 'react'

export const Cartitem = ({ item, count }) => {
    const dispatch = useDispatch()
    const Productsdata = useSelector(state => state.Productsdata.products)
    const { remove_item, increase_item_count, decrease_item_count } = changecartstate
    const { image, price, name } = Productsdata[item]
    const totalprice = useSelector(state => state.CartPrice)
    const [modalmessage, setmodalmessage] = useState("")
    const [showmodalmessage, changeshowmodalmessage] = useState(false)
    
    const increaseitemcount = () => {
        if (count < 20) {
            dispatch(increase_item_count(item))
            dispatch(changecartprice(totalprice + price))
            return
        }
        showmodalwithmessageandvariant(changeshowmodalmessage, `You cannot order more than 20 items of ${name}`, setmodalmessage)
    }

    const decreaseitemcount = () => {
        if (count > 1) {
            dispatch(decrease_item_count(item))
            dispatch(changecartprice(totalprice - price))
            return
        }
        showmodalwithmessageandvariant(changeshowmodalmessage, `You cannot order less than 1 item of ${name}`, setmodalmessage)
    }

    const removeitemfromcart = () => {
        const itemprice = count * price
        dispatch(changecartprice(totalprice - itemprice))
        dispatch(remove_item(item))
    }

    return (
        <div className="mb-5 cartitem" >
            <div className="cartimagecontainer">
                <Link to={`${PATHS.PRODUCTPATH}${item}`} ><img className="cartimage" src={image} alt={name} /></Link>
            </div>
            <div>
                <h6>
                    <Link className="text-decoration-none text-dark" to={`${PATHS.PRODUCTPATH}${item}`} >{name}</Link>
                </h6>
                <p>₹ {price}</p>
                <div className="space-between">
                    <div className="increasedecreasecartitem w-25">
                        <div>
                            <button onClick={decreaseitemcount} className={`w-50 rounded-circle buttondisplay bordernone bg-warning
                             ${count === 1 ? "opacity50" : ""}`}>
                                -
                            </button>
                        </div>

                        <div>{count}</div>

                        <div>
                            <button onClick={increaseitemcount} className={`w-50 bordernone rounded-circle bg-warning buttondisplay ${count === 20 ? "opacity50" : ""}`}>
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <button onClick={removeitemfromcart} className="bg-warning bordernone p-2 rounded-pill">
                            Remove item
                        </button>
                    </div>
                </div>
            </div>
            <div>Delivery by {deliverydate}</div>
            <Modal centered show={showmodalmessage} contentClassName="modalwithoutcolor" onHide={() => hidemodal(changeshowmodalmessage)}>
                <Alert variant="danger">
                    {modalmessage}
                </Alert>
            </Modal>
        </div>
    )
}