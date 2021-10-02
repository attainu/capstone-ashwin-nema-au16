import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { changecartstate, changecartprice } from '../../../actions'
import { PATHS } from '../../../config'
import { Link } from 'react-router-dom'
import { deliverydate, makesubpath, Add_Remove_Item_Button_Setter } from '../../../utils'
import { useState } from 'react'
import { NotificationModal } from '../../Modal Components'
import Button from '@mui/material/Button'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useMeasure from 'react-use-measure'
import useMediaQuery from '@mui/material/useMediaQuery'

const CartItemContent = ({ setmodalmessage, displaymodalsetter, item, count, cartitemlayout }) => {
    const dispatch = useDispatch()
    const { CartPrice, Productsdata: { products } } = useSelector(state => state)

    const { remove_item } = changecartstate
    const { image, price, name } = products[item]

    const [ref, bounds] = useMeasure()
    const limitreached = `Sorry you cannot order more than 20 items of ${name}`
    const belowlimitorder = `Sorry you cannot order less than 1 item of ${name}`

    const addremovebbuttonconfigration = [count, dispatch, CartPrice, price, item, displaymodalsetter, belowlimitorder, setmodalmessage]

    const removeitemfromcart = () => {
        const itemprice = count * price
        dispatch(changecartprice(CartPrice - itemprice))
        dispatch(remove_item(item))
    }

    return (
        <div ref={ref} className={`mb-5  ${cartitemlayout === true ? "cartitem":"alternatecartitemlayout" }`} >
            {
                cartitemlayout && <div className="cartimagecontainer ">
                    <Link to={`${makesubpath(PATHS.PRODUCT, item)}`} ><img className="cartimage" src={image} alt={name} /></Link>
                </div>
            }
            <div>
                <h6 >
                    <Link className="text-decoration-none text-dark" to={`${makesubpath(PATHS.PRODUCT, item)}`} >{name}</Link>
                </h6>
                <p>₹ {price}</p>
                <div className={`${bounds.width > 300 && "space-between" }`}>
                    <div className={`increasedecreasecartitem  ${bounds.width <= 300 ? "d-flex justify-content-center":"w-25" }` } >
                        <div>
                            <RemoveCircleIcon className={`${count > 1 ? "cursorpointer" : ""}`} onClick={() => Add_Remove_Item_Button_Setter(count, addremovebbuttonconfigration, false)} style={{ color: "#ffc107" }}> - </RemoveCircleIcon>
                        </div>

                        <div>{count}</div>

                        <div>
                            <AddCircleTwoToneIcon className={`${count < 20 ? "cursorpointer" : ""}`} onClick={() => Add_Remove_Item_Button_Setter(count, addremovebbuttonconfigration, true, limitreached)} style={{ color: "#ffc107" }}></AddCircleTwoToneIcon>
                        </div>
                    </div>
                    <div className={`${bounds.width <= 300 && "mt-3 d-flex justify-content-center"}`}>
                        <Button className={`bg-warning text-dark ${bounds.width > 200 && "rounded-pill"}`} onClick={removeitemfromcart} > Remove item </Button>
                    </div>
                </div>
            </div>
            <div>Delivery by {deliverydate}</div>
        </div>

    )
}

export const Cartitem = ({ item, count }) => {
    const [modalmessage, setmodalmessage] = useState("")
    const [showmodalmessage, displaymodalsetter] = useState(false)
    const cartitemlayout = useMediaQuery('(min-width:700px)')
    const {  Productsdata: { products } } = useSelector(state => state)
    const { image, name } = products[item]

    const props = { setmodalmessage, displaymodalsetter, item, count, cartitemlayout }
    return (
        <> 
             {
                 cartitemlayout === true ? 
                 <CartItemContent {...props} /> :
                 <div className="maincartitemcontainer">
                     <div className="cartimagecontainer">
                     <Link to={`${makesubpath(PATHS.PRODUCT, item)}`} ><img className="cartimage" src={image} alt={name} /></Link>
                     </div>
                     <div>
                     <CartItemContent {...props} />
                     </div>
                 </div>
             }
            
            <NotificationModal show={showmodalmessage} centered={true} onHide={displaymodalsetter} currentmodalmessage={modalmessage} alertvariant="danger" successmessage="" />
        </>

    )
}