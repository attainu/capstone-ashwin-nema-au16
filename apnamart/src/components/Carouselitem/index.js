import './index.css'
import { changeitemcountincart, changeproductcount, changecartstate } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { PATHS } from '../../config'

const Carouselitem = (props) => {
    const dispatch = useDispatch()
    const { itemname, itemdetails, history } = props
    const {increase_count, decrease_count} = changeitemcountincart
    const {product_added, product_removed} = changeproductcount
    const {new_item, remove_cart_item, new_price} = changecartstate
    const cartprice = useSelector(state => state.CartPrice)

    const { count, price, image } = itemdetails
    const [itemcount, setitemcount] = useState(count)
    const disabled = itemcount < 20 ? "" : "disabled"
    const Add_to_cart = () => {
        dispatch(product_added({ item: itemname }))
        setitemcount(itemcount + 1)
        dispatch(new_price(cartprice + price))
        if (itemcount === 0) {
            dispatch(increase_count())
            dispatch(new_item(itemname))
        }
    }

    const Remove_from_cart = () => {
        dispatch(product_removed({ item: itemname }))
        setitemcount(itemcount - 1)
        dispatch(new_price(cartprice - price))
        if (itemcount === 1) {
            dispatch(decrease_count())
            dispatch(remove_cart_item(itemname))
        }
        
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

                {itemcount === 0 ? <button onClick={Add_to_cart} className="btn btn-warning">Add to cart</button> : <>
                    <div className="addingbutton">
                        <button onClick={Remove_from_cart} className="btn btn-warning cartbutton rounded-circle d-flex justify-content-center">-</button>
                        <div className="itemcarouselcount">{itemcount}</div>
                        <button onClick={Add_to_cart} className={`btn btn-warning cartbutton rounded-circle d-flex justify-content-center ${disabled}`}>+</button>

                    </div>
                </>}
            </div>
        </>
    )
}

export default Carouselitem