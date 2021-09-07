import './index.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changecartstate, changecartprice, getproductsdata } from '../../actions'
import { PATHS } from '../../config'
import { Fragment, useState } from 'react'
import { useEffect } from 'react'

const Product = ({ history }) => {
    const { add_new_item, remove_item, increase_item_count, decrease_item_count } = changecartstate
    const { itemname } = useParams()
    const dispatch = useDispatch()
    const Productsdata = useSelector(state => state.Productsdata.products)
    const cartprice = useSelector(state => state.CartPrice)
    const cartitems = useSelector(state => state.Cart)
    const [name, changename] = useState("")
    const [image, changeimage] = useState("")
    const [price, changeprice] = useState(0)
    const [details, changedetails] = useState({})
    const [detailitems, changedetailitems] = useState([])
    const [_id, setid] = useState("")
    const [description, setdescription] = useState("")

    const count = cartitems[itemname] === undefined ? 0 : cartitems[itemname].count

    const disabled = count < 20 ? "" : "disabled"

    useEffect(() => {
        if (Object.keys(Productsdata).length === 0) {
            dispatch(getproductsdata())
            return
        }

        if (Productsdata[itemname] === undefined) {
            history.push(PATHS.HOME)
        }

        if (Productsdata[itemname] !== undefined) {
            const { name, image, price, details, _id, description } = Productsdata[itemname]
            changename(name)
            changeimage(image)
            changeprice(price)
            changedetails(details)
            changedetailitems(Object.keys(details))
            setid(_id)
            setdescription(description)
        }


    }, [Productsdata, itemname, history, dispatch])

    const Add_to_cart = () => {

        dispatch(changecartprice(cartprice + price))
        if (count === 0) {
            dispatch(add_new_item({ _id, price }))
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



    return (
        <>
            <div className="productcontent space-between mt-3">
                <div className="productimage">
                    <img src={image} alt={name} />
                </div>

                <div className="productinformation">
                    <div>
                        <h5>{name}</h5>
                        <p>M.R.P. ₹ {price}</p>
                    </div>

                    <div>
                        In stock
                    </div>

                    <div>
                        Sold by ApnaMart
                    </div>

                    {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning productbutton">Add to cart</button> : <>
                        <div className="space-between productbutton">
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
                {
                    typeof description === "string" ? <p >{description}</p> :
                    <ul>
                        {
                            description.map((item, index) => {
                                return (
                                    <li key={index}>{item} </li>
                                )
                            })
                        }
                    </ul>
                }
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