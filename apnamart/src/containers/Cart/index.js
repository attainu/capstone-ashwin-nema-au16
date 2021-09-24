import './index.css'
import { useSelector } from 'react-redux'
import { useEffect, useState,  useContext } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Cartitem, Ordersummary } from '../../components';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { NotificationModal, CustomModalNotificationComponent, EmptyCart } from '../../components'
import Button from '@mui/material/Button'
import { ProductsdataloadedContext } from '../../utils'

const Usercart = ({ nomargin }) => {
    const {Cart, Profile, Auth:{loginstate}} = useSelector(state => state)
    const count = Object.keys(Cart).length

    const [modalactivator, activatemodal] = useState(Object.keys(Profile).length > 0)
    const [modal, showmodal] = useState(false)
    const productsdataisloaded = useContext(ProductsdataloadedContext)

    useEffect(() => {
        if (loginstate === true && modalactivator !== true) {
            activatemodal(true)
            return
        }
        
        if (loginstate !== true && modalactivator !== true) {
            activatemodal(true)
            showmodal(true)
        }

        document.body.style.backgroundColor = "#f1f3f6"

        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [showmodal, count, modalactivator,loginstate])
    return (
        <>
            {
                productsdataisloaded &&
                <>
                    <div className="usercart">
                        <div className="usercartsection "></div>
                        <div className={`profilecontentdisplaycolor usercartsectionitems ps-3 me-3 py-3 pe-3 ${nomargin === undefined && "mt-5"}`}>
                            <h5>My Cart{count > 0 ? <>({count}) </> : <></>}</h5>
                            {count === 0 && <EmptyCart />}

                            {count > 0 && <>
                                <SimpleBar style={{ height: "60vh" }}>
                                    {Object.keys(Cart).map((item, index) => {
                                        const count = Cart[item].count
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
                                    Object.keys(Profile).length > 0 &&
                                    <Link to={PATHS.CHECKOUT} className="text-decoration-none" >
                                        <Button className="bg-warning text-dark" variant="contained" color="primary">
                                            Checkout
                                        </Button>
                                    </Link>

                                }
                            </div>
                        </div>}
                        <div className="usercartsection"></div>
                    </div>
                    <NotificationModal show={modal} centered={true} onHide={showmodal} alertvariant="info" additionalcustomcomponent={true} Customcomponent={<CustomModalNotificationComponent message="You are not logged in." linkmessage="Click Here to" link={PATHS.LOGIN} linktext="Login" />} />
                </>
            }
        </>
    )
}

export default Usercart