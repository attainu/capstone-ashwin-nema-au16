import './index.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changecartstate, changecartprice, getproductsdata } from '../../actions'
import { PATHS } from '../../config'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import useMeasure from 'react-use-measure'
import { deliverydate } from '../../utils'
import { NotificationModal } from '../../components'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { DetailsTable } from '../../components'
import useMediaQuery from '@mui/material/useMediaQuery'

const Product = ({ history }) => {
    const bordermarginquery = useMediaQuery('(max-width:400px)')
    const tablequery = useMediaQuery('(max-width:700px)')
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
            history.push(PATHS.NOTFOUND)
        }

        if (Productsdata[productid] !== undefined) {
            const { name, image, price, details, _id, description } = Productsdata[productid]
            changename(name)
            changeimage(image)
            changeprice(price)
            changedetails(details)
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
            width: bounds.width * 2,
            height: bounds.height * 2
        },
        enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
        enlargedImagePosition: 'beside',
        enlargedImageContainerDimensions: { width: '155%', height: '125%' },
        shouldUsePositiveSpaceLens: true,
    };

    return (
        <>
            <div className="productpagegrid text-break">
                <div className="productcontent mt-3">
                    <div ref={ref} className="productimage">
                        <ReactImageMagnify {...imageProps} />

                    </div>

                    <div className="productinformation">
                        <div>
                            <h5 className="text-break">{name}</h5>
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

                        {count === 0 ? <button onClick={Add_to_cart} className="btn btn-warning productcount w-75">Add to cart</button> : <>
                            <div className="space-between productcount w-75">
                                <div>
                                    <RemoveCircleIcon fontSize="large" className="cursorpointer" onClick={Remove_from_cart} style={{ color: "#ffc107" }}> - </RemoveCircleIcon>
                                </div>
                                <div className="itemcarouselcount">{count}</div>
                                <AddCircleTwoToneIcon fontSize="large" className={`${count < 20 ? "cursorpointer" : ""}`} onClick={Add_to_cart} style={{ color: "#ffc107" }}></AddCircleTwoToneIcon>
                            </div>

                        </>}
                    </div>
                </div>
                <div >
                    <hr className="mx-4 mt-5"></hr>
                </div>
                <div className={`productdescription ms-2 text-wrap ${bordermarginquery && 'mt-5'}`}>
                    <pre className="text-wrap ms-1 me-1">
                        <DetailsTable title="Product description" titlesize="h6" tabledata={description} />
                    </pre>
                </div>
                <div>
                    <hr className="mx-4" ></hr>
                </div>
                <div className={`ms-2  ${bordermarginquery && 'mt-5 me-4'}`}>
                    <div className={`productdetails ${tablequery === true && bordermarginquery === true && 'w-100'} ${tablequery === true && bordermarginquery === false && 'w-75'} ${tablequery === false && bordermarginquery === false && 'w-50'} d-flex flex-column mb-5`}>
                        <DetailsTable title="Details" titlesize="h6" tabledata={details} titletopborder={true} />
                    </div>
                </div>
            </div>
            <NotificationModal show={modal} centered={true} currentmodalmessage={`Sorry you cannot order more than 20 items of ${name}`} onHide={showhidemodal} alertvariant="danger" successmessage="" />
        </>
    )


}

export default Product