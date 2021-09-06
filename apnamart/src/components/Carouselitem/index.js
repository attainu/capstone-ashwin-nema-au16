import './index.css'
import {changecartstate,changecartprice } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { PATHS } from '../../config'

const Carouselitem = ({ itemdetails, history }) => {
    const dispatch = useDispatch() 
    const {add_new_item, remove_item,increase_item_count, decrease_item_count} = changecartstate
    const {price, image, name,_id } = itemdetails
    const cartprice = useSelector(state => state.CartPrice)
    const cartitems = useSelector(state => state.Cart)
    const count = cartitems[_id] === undefined ? 0 : cartitems[_id].count
    const disabled = count < 20 ? "" : "disabled"

    const Add_to_cart = () => {
        dispatch(changecartprice(cartprice + price))
        if (count === 0) {
            dispatch(add_new_item({_id, price}))
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
        history.push(`${PATHS.PRODUCTPATH}${_id}`)
    }
    return (
        <>
            <div className="productcarousel space-between border ms-2 w-100">
                <div className="productcarouselimage text-center">
                    <img onClick={Redirect} alt={name}  src={image} className="cardimage" />
                </div>
                <span onClick={Redirect} className="text-center itemcarouseltext">{name}</span>
                <span className="text-center">Rs. {price}</span>

                {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning">Add to cart</button> : <>
                    <div className="space-between">
                        <button onClick={Remove_from_cart} className="btn btn-warning cartbutton rounded-circle d-flex justify-content-center">-</button>
                        <div className="itemcarouselcount">{count}</div>
                        <button onClick={Add_to_cart} className={`btn btn-warning cartbutton rounded-circle d-flex justify-content-center ${disabled}`}>+</button>

                    </div>
                </>}
            </div>
        </>
    )
}

export default Carouselitem