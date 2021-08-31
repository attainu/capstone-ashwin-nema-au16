import './index.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Cartitem, Ordersummary } from '../../components';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';

const Usercart = ({nomargin}) => {
    const cart = useSelector(state => state.Cart)
    const count = useSelector(state => state.cartcount)

    useEffect(() => {
        document.body.style.backgroundColor = "#f1f3f6"
        return () => {
            if (nomargin === undefined) {
                document.body.style.backgroundColor = "white"
            }
        }
    }, [nomargin])

    return (
        <>
            <div className={`usercart ${nomargin === undefined ? `mt-3` : ``} `}>
                <div className="usercartsection"></div>
                <div className="profilecontentdisplaycolor usercartsectionitems ps-3 me-3 py-3 pe-3">
                    <h5>My Cart{count > 0 ? <>({count}) </> : <></>}</h5>
                    {count === 0 && <>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column">
                                <div className="emptycartimagecontainer">
                                    <img className="emptycartimage" src="https://res.cloudinary.com/ash006/image/upload/v1629823207/7077465-removebg-preview_nsotp8.png" alt="empty cart" />
                                </div>
                                <Alert variant="danger">
                                    <p>Your car is empty. Please add something to the cart</p>
                                </Alert>
                            </div>
                        </div>
                    </>}

                    {count > 0 && <>
                        <SimpleBar style={{ height: "60vh" }}>
                            {Object.keys(cart).map((item, index) => {

                                return (
                                    <Cartitem key={index}  item={item}  />
                                )
                            })}
                        </SimpleBar>
                    </>}
                </div>
                {count > 0 && <div className="profilecontentdisplaycolor pe-3 ps-3 py-3 usercartpaymentsection">
                    <h5>Price details(Summary)</h5>
                    <hr />
                    <div className="paymentdetailsitem">
                        <div>
                            <strong>Item</strong>
                        </div>

                        <div>
                            <strong>Price</strong>
                        </div>
                    </div>
                    
                    <Ordersummary ordersummaryclass="paymentdetailsitem" />
 
                    <div className="d-flex justify-content-center mt-3">
                        <Link to={PATHS.CHECKOUT} >
                            <button className="bordernone p-2 rounded-pill checkoutbutton">Checkout </button>
                        </Link>
                    </div>
                </div>}
                <div className="usercartsection"></div>
            </div>
        </>
    )
}

export default Usercart