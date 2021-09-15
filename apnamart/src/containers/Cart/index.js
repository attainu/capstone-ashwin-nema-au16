import './index.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Cartitem, Ordersummary } from '../../components';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { NotificationModal } from '../../components'
import Button from '@material-ui/core/Button';
const Loginreminder = () => {
    return (
        <>
            <p>
                You are not logged in.
            </p>
            <p className="smalltext text-center">
                Click Here to <Link to={PATHS.LOGIN}>Login</Link>
            </p>
        </>
    )
}

const Usercart = ({ nomargin }) => {
    const cart = useSelector(state => state.Cart)
    const count = Object.keys(cart).length
    const isloggedin = Object.keys(useSelector(state => state.Profile)).length > 1

    const [modal, showmodal] = useState(false)

    useEffect(() => {
        if (isloggedin === false && count > 0) {
            showmodal(true)
        }
        document.body.style.backgroundColor = "#f1f3f6"

        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [isloggedin, showmodal, count])
    return (
        <>
            <div className="usercart">
                <div className="usercartsection "></div>
                <div className={`profilecontentdisplaycolor usercartsectionitems ps-3 me-3 py-3 pe-3 ${nomargin === undefined && "mt-5"}`}>
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
                                const count = cart[item].count
                                return (
                                    <Cartitem key={index} item={item} count={count} />
                                )
                            })}
                        </SimpleBar>
                    </>}
                </div>
                {count > 0 && <div className={`profilecontentdisplaycolor pe-3 ps-3 py-3 h-100 usercartpaymentsection ${nomargin === undefined && "mt-5"}`}>
                    <h5>Price details(Summary)</h5>
                    <hr />
                    <div className="space-between smalltext">
                        <div>
                            <strong>Item</strong>
                        </div>

                        <div>
                            <strong>Price</strong>
                        </div>
                    </div>

                    <Ordersummary ordersummaryclass="space-between smalltext" />

                    <div className="d-flex justify-content-center mt-3">
                        {
                            isloggedin &&
                            <Link className="text-decoration-none" to={PATHS.CHECKOUT} >
                                <Button className="bg-warning text-dark" variant="contained" color="primary">
                                    Checkout
                                </Button>
                            </Link>

                        }
                    </div>
                </div>}
                <div className="usercartsection"></div>
            </div>
            <NotificationModal show={modal} centered={true} onHide={showmodal} alertvariant="info" notick={true} Customcomponent={<Loginreminder />} />
        </>
    )
}

export default Usercart