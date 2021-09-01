import './index.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changecartstate, changecartprice } from '../../actions'
import { PATHS } from '../../config'
import { Fragment } from 'react'
import { Productsdata } from '../../Data'

const Product = ({ history }) => {
    const { add_new_item, remove_item, increase_item_count, decrease_item_count } = changecartstate
    const { itemname } = useParams()
    const dispatch = useDispatch()
    const cartprice = useSelector(state => state.CartPrice)
    const cartitems = useSelector(state => state.Cart)
    const count = cartitems[itemname] === undefined ? 0 : cartitems[itemname].count
    
    const { image, price, details, description } = Productsdata[itemname]
    const disabled = count < 20 ? "" : "disabled"
    const detailitems = Object.keys(details)


    const Add_to_cart = () => {
        dispatch(changecartprice(cartprice + price))
        if (count === 0) {
            dispatch(add_new_item({ itemname, price }))
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

    if (Productsdata[itemname] === undefined) {
        history.push(PATHS.HOME)
    }

    return (
        <>
            {
                Productsdata[itemname] !== undefined &&

                <>
                    <div className="productcontent mt-3">
                        <div className="productimage">
                            <img src={image} alt={itemname} />
                        </div>

                        <div className="productinformation">
                            <div>
                                <h5>{itemname}</h5>
                                <p>M.R.P. ₹ {price}</p>
                            </div>

                            <div>
                                In stock
                            </div>

                            <div>
                                Sold by ApnaMart
                            </div>

                            {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning productbutton">Add to cart</button> : <>
                                <div className="addingbutton productbutton">
                                    <button onClick={Remove_from_cart} className="btn btn-warning cartbutton rounded-circle d-flex justify-content-center">-</button>
                                    <div className="itemcarouselcount">{count}</div>
                                    <button onClick={Add_to_cart} className={`btn btn-warning cartbutton rounded-circle d-flex justify-content-center ${disabled}`}>+</button>

                                </div>

                            </>}
                        </div>
                    </div>
                    <div>
                    </div>
                    <hr className="mx-4 mt-5"></hr>
                    <div className="productdescription ms-2">
                        <h6>Product description</h6>
                        <p >{description}</p>
                    </div>
                    <hr className="mx-4 mt-5"></hr>
                    <div className="ms-2">
                        <h6>Details</h6>
                        <div className="productdetails w-50">
                            {detailitems.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div>{item}</div>
                                        <div >{details[item]}</div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </>
            }
        </>


    )


}

export default Product