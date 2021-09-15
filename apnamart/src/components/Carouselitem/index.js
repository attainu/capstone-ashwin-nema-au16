import './index.css'
import { changecartstate, changecartprice } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { NotificationModal } from '../Notification Modal'
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Carouselitem = ({ itemdetails, history, carouselheight }) => {
    const [carouselitemheight, setcarouselitemheight] = useState('30vh')
    const [modal, showhidemodal] = useState(false)

    useEffect(() => {
        if (carouselheight !== undefined && carouselheight !== 0) {
            const desiredheight = carouselheight * 0.75
            setcarouselitemheight(`${desiredheight}px`)
        }
    }, [carouselheight, setcarouselitemheight])

    const dispatch = useDispatch()
    const { add_new_item, remove_item, increase_item_count, decrease_item_count } = changecartstate
    const { price, image, name, _id, link } = itemdetails
    const cartprice = useSelector(state => state.CartPrice)
    const cartitems = useSelector(state => state.Cart)
    const count = cartitems[_id] === undefined ? 0 : cartitems[_id].count

    const Add_to_cart = () => {
        if (count === 20) {
            showhidemodal(true)
            return
        }
        dispatch(changecartprice(cartprice + price))
        if (count === 0) {
            dispatch(add_new_item({ _id }))
            return
        }
        dispatch(increase_item_count(_id))
    }

    const Remove_from_cart = () => {
        dispatch(changecartprice(cartprice - price))
        if (count === 1) {
            dispatch(remove_item(_id))
            return
        }
        dispatch(decrease_item_count(_id))
    }

    const Redirect = () => {
        history.push(`${link}`)
    }

    return (
        <>
            <div style={{ minHeight: carouselitemheight }} className="productcarousel space-between border ms-2 w-100">
                <div className="productcarouselimage text-center">
                    <img onClick={Redirect} alt={name} src={image} className="cardimage" />
                </div>
                <span onClick={Redirect} className="text-center itemcarouseltext">{name}</span>
                <span className="text-center">Rs. {price}</span>

                {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning">Add to cart</button> : <>
                    <div className="space-between">
                        <RemoveCircleIcon fontSize="large" className={`${count > 1 ? "cursorpointer" : ""}`} onClick={Remove_from_cart} style={{ color: "#ffc107" }}> - </RemoveCircleIcon>
                        <div className="itemcarouselcount">{count}</div>
                        <AddCircleTwoToneIcon fontSize="large" className={`${count < 20 ? "cursorpointer " : ""}`} onClick={Add_to_cart} style={{ color: "#ffc107" }}></AddCircleTwoToneIcon>
                    </div>
                </>}
            </div>
            <NotificationModal show={modal} centered={true} currentmodalmessage={`Sorry you cannot order more than 20 items of ${name}`} onHide={showhidemodal} alertvariant="danger" successmessage="" />
        </>
    )
}

export default Carouselitem