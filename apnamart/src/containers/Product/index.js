import './index.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changecartstate, changecartprice, getproductsdata } from '../../actions'
import { PATHS } from '../../config'
import { Fragment, useState } from 'react'
import { useEffect } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import useMeasure from 'react-use-measure'
import {deliverydate} from '../../utils'
import {NotificationModal} from '../../components'




const Product = ({ history }) => {
    const { add_new_item, remove_item, increase_item_count, decrease_item_count } = changecartstate

    const { productid } = useParams()
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
    const [modal, showhidemodal] = useState(false) 
    const [ref, bounds] = useMeasure()

    const count = cartitems[productid] === undefined ? 0 : cartitems[productid].count

    useEffect(() => {
        if (Object.keys(Productsdata).length === 0) {
            dispatch(getproductsdata())
            return
        }

        if (Productsdata[productid] === undefined) {
            history.push(PATHS.HOME)
        }

        if (Productsdata[productid] !== undefined) {
            const { name, image, price, details, _id, description } = Productsdata[productid]
            changename(name)
            changeimage(image)
            changeprice(price)
            changedetails(details)
            changedetailitems(Object.keys(details))
            setid(_id)
            setdescription(description)
        }


    }, [Productsdata, productid, history, dispatch])

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


    const imageProps = {
        smallImage: {
            alt: name,
            src: image,
            width: bounds.width,
            height: bounds.height
        },
        largeImage: {
            src: image,
            width: bounds.width *2,
            height: bounds.height *2
        },
        enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
        enlargedImagePosition:'beside',
        enlargedImageContainerDimensions:{width: '155%', height: '150%'},
        shouldUsePositiveSpaceLens:true,
    };

    return (
        <>
            <div className="productcontent space-between mt-3">
                <div ref={ref} className="productimage">
                    <ReactImageMagnify {...imageProps} />

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

                    <div>
                        Delivery by {deliverydate}
                    </div>

                    {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning productbutton">Add to cart</button> : <>
                        <div className="space-between productbutton">
                            <button onClick={Remove_from_cart} className="btn btn-warning cartbutton rounded-circle d-flex justify-content-center">-</button>
                            <div className="itemcarouselcount">{count}</div>
                            <button onClick={Add_to_cart} className={`btn btn-warning cartbutton rounded-circle d-flex justify-content-center ${count === 20 ? "opacity50" : ""}`}>+</button>

                        </div>

                    </>}
                </div>
            </div>
            <div>
            </div>
            <hr className="mx-4 mt-5"></hr>
            <div className="productdescription ms-2 text-wrap">
                <h6>Product description</h6>
                <pre className="text-wrap ms-1 me-1"> 
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
                </pre>
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
            <NotificationModal show={modal} centered={true} currentmodalmessage={`Sorry you cannot order more than 20 items of ${name}`} onHide={showhidemodal} alertvariant="danger" successmessage="" />
        </>

    )


}

export default Product