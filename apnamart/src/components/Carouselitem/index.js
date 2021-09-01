import './index.css'
import {changecartstate,changecartprice } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { PATHS } from '../../config'

const Carouselitem = ({ itemname, itemdetails, history }) => {
    const dispatch = useDispatch() 
    const {add_new_item, remove_item,increase_item_count, decrease_item_count} = changecartstate
    const { price, image } = itemdetails
    const cartprice = useSelector(state => state.CartPrice)
    const cartitems = useSelector(state => state.Cart)
    const count = cartitems[itemname] === undefined ? 0 : cartitems[itemname].count
    const disabled = count < 20 ? "" : "disabled"

    const Add_to_cart = () => {
        dispatch(changecartprice(cartprice + price))
        if (count === 0) {
            dispatch(add_new_item({itemname, price}))
            return
        }
        dispatch(increase_item_count(itemname))
    }

    const Remove_from_cart = () => {
        dispatch(changecartprice(cartprice - price))
        if (count === 1) {
            dispatch(remove_item(itemname))
            return
        }
        dispatch(decrease_item_count(itemname))
    }

    const Redirect = (productname) => {
        history.push(`${PATHS.PRODUCTPATH}${productname}`)
    }
    return (
        <>
            <div className="productcarousel border ms-2">
                <div className="productcarouselimage text-center">
                    <img onClick={() => Redirect(itemname)} alt={itemname}  src={image} className="cardimage" />
                </div>
                <span onClick={() => Redirect(itemname)} className="text-center itemcarouseltext">{itemname}</span>
                <span className="text-center">Rs. {price}</span>

                {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning">Add to cart</button> : <>
                    <div className="addingbutton">
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