import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeproductcount, changecartstate, changeitemcountincart } from '../../actions'
import { Modal } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import { PATHS } from '../../config'
import { Link } from 'react-router-dom'

import { useState } from 'react'

export const Cartitem = ({ item, deliverydate, currentstate, changecurrentstate }) => {
    const allitems = useSelector(state => state.Itemslist)
    const { product_added, product_removed, make_count_zero } = changeproductcount
    const { new_price, remove_cart_item } = changecartstate
    const { decrease_count } = changeitemcountincart
    const dispatch = useDispatch()
    const { count, image, price } = allitems[item]
    const totalprice = useSelector(state => state.CartPrice)
    const [modalmessage, setmodalmessage] = useState("")
    const [showmodalmessage, changeshowmodalmessage] = useState(false)

    const hidemodal = () => {
        changeshowmodalmessage(false)
    }

    const increaseitemcount = () => {
        if (count < 20) {
            dispatch(product_added({ item }))
            dispatch(new_price(totalprice + price))
            changecurrentstate(!currentstate)
            return
        }
        setmodalmessage(`You cannot order more than 20 items of ${item}`)
        changeshowmodalmessage(true)
    }

    const decreaseitemcount = () => {
        if (count > 1) {
            dispatch(product_removed({ item }))
            dispatch(new_price(totalprice - price))
            changecurrentstate(!currentstate)

            return
        }
        setmodalmessage(`You cannot order less than 1 item of ${item}`)
        changeshowmodalmessage(true)
    }

    const removeitemfromcart = () => {
        changecurrentstate(!currentstate)
        const itemprice = count * price
        dispatch(new_price(totalprice - itemprice))
        dispatch(decrease_count())
        dispatch(remove_cart_item(item))
        dispatch(make_count_zero(item))
    }

    return (
        <div className="mb-5 cartitem" >
            <div className="cartimagecontainer">
                <Link to={`${PATHS.PRODUCTPATH}${item}`} ><img className="cartimage" src={image} alt={item} /></Link>
            </div>
            <div>
                <h6>
                    <Link className="text-decoration-none text-dark" to={`${PATHS.PRODUCTPATH}${item}`} >{item}</Link>
                </h6>
                <p>₹ {price}</p>
                <div className="addremovecartitem">
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
            <Modal centered show={showmodalmessage} contentClassName="modalalert" onHide={hidemodal}>
                <Alert variant="danger">
                    {modalmessage}
                </Alert>
            </Modal>
        </div>
    )
}