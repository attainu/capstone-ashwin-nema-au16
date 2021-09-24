import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { changecartstate, changecartprice } from '../../actions'
import { PATHS } from '../../config'
import { Link } from 'react-router-dom'
import { deliverydate, showmodalwithmessageandvariant, makesubpath } from '../../utils'
import { useState } from 'react'
import { NotificationModal } from '../Modal Components'
import Button from '@mui/material/Button'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
        showmodalwithmessageandvariant(changeshowmodalmessage, `Sorry you cannot order more than 20 items of ${name}`, setmodalmessage)
    }

    const decreaseitemcount = () => {
        if (count > 1) {
            dispatch(decrease_item_count(item))
            dispatch(changecartprice(totalprice - price))
            return
        }
        showmodalwithmessageandvariant(changeshowmodalmessage, `Sorry you cannot order less than 1 item of ${name}`, setmodalmessage)
    }

    const removeitemfromcart = () => {
        const itemprice = count * price
        dispatch(changecartprice(totalprice - itemprice))
        dispatch(remove_item(item))
    }

    return (
        <div className="mb-5 cartitem" >
            <div className="cartimagecontainer">
                <Link to={`${makesubpath(PATHS.PRODUCT, item)}`} ><img className="cartimage" src={image} alt={name} /></Link>
            </div>
            <div>
                <h6 >
                    <Link className="text-decoration-none text-dark" to={`${makesubpath(PATHS.PRODUCT, item)}`} >{name}</Link>
                </h6>
                <p>₹ {price}</p>
                <div className="space-between">
                    <div className="increasedecreasecartitem w-25">
                        <div>
                            <RemoveCircleIcon className={`${count > 1 ? "cursorpointer" : ""}`} onClick={decreaseitemcount} style={{ color: "#ffc107" }}> - </RemoveCircleIcon>

                        </div>

                        <div>{count}</div>

                        <div>
                            <AddCircleTwoToneIcon className={`${count < 20 ? "cursorpointer" : ""}`} onClick={increaseitemcount} style={{ color: "#ffc107" }}></AddCircleTwoToneIcon>
                        </div>
                    </div>
                    <div>
                        <Button className="bg-warning rounded-pill" onClick={removeitemfromcart} > Remove item </Button>
                    </div>
                </div>
            </div>
            <div>Delivery by {deliverydate}</div>
            <NotificationModal show={showmodalmessage} centered={true} onHide={changeshowmodalmessage} currentmodalmessage={modalmessage} alertvariant="danger" successmessage="" />
        </div>
    )
}