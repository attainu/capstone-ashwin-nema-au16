import './index.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { add_to_Cart, remove_from_cart, add_to_cart_icon, remove_from_cart_icon } from '../../actions'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../config'
import { Fragment } from 'react'

const Product = () => {
    const { productname } = useParams()
    const dispatch = useDispatch()
    const itemlist = useSelector(state => state.Itemslist)

    let renderproduct = {}

    if (itemlist[productname] !== undefined) {
        renderproduct = { ...itemlist }
    } else {
        renderproduct[productname] = { image: 0, price: 0, count: 0, details: 0, description: 0 }
    }

    const { image, price, count, details, description } = renderproduct[productname]
    const [itemcount, setitemcount] = useState(count)


    const disabled = itemcount < 20 ? "" : "disabled"
    const detailitems = Object.keys(details)


    const Add_to_cart = () => {
        dispatch(add_to_Cart({ item: productname }))
        setitemcount(itemcount + 1)
        if (itemcount === 0) {
            dispatch(add_to_cart_icon())
        }
    }

    const Remove_from_cart = () => {
        dispatch(remove_from_cart({ item: productname }))
        setitemcount(itemcount - 1)
        if (itemcount === 1) {
            dispatch(remove_from_cart_icon())
        }
    }

    return (
        <>

            {
                itemlist[productname] === undefined && <Redirect to={PATHS.HOME} />
            }

            <div className="productcontent mt-3">
                <div className="productimage">
                    <img src={image} alt={productname} />
                </div>

                <div className="productinformation">
                    <div>
                        <h5>{productname}</h5>
                        <p>M.R.P. ₹ {price}</p>
                    </div>

                    <div>
                        In stock
                    </div>

                    <div>
                        Sold by ApnaMart
                    </div>

                    {itemcount === 0 ? <button onClick={Add_to_cart} className="btn btn-warning productbutton">Add to cart</button> : <>
                        <div className="addingbutton productbutton">
                            <button onClick={Remove_from_cart} className="btn btn-warning cartbutton rounded-circle d-flex justify-content-center">-</button>
                            <div className="itemcarouselcount">{itemcount}</div>
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


    )
}

export default Product