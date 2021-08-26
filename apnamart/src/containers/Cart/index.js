import './index.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Cartitem } from '../../components/Cart item';
import { Alert } from 'react-bootstrap';

const Usercart = () => {
    const cart = useSelector(state => state.Cart)
    const count = useSelector(state => state.cartcount)
    const allitems = useSelector(state => state.Itemslist)
    const totalcost = useSelector(state => state.CartPrice)
    // console.log(totalcost)
    // const [totalcost, changetotalcost] = useState(cost)
    let date = new Date()
    date.setDate(date.getDate() + 3)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [currentstate, changecurrentstate] = useState(true)

    const deliverydate = days[date.getDay()] + " " + date.getDate() + " " + month[date.getMonth()]
    useEffect(() => {
        document.body.style.backgroundColor = "#f1f3f6"
        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [])

    return (
        <>
            <div className="usercart mt-3">
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
                                    <Cartitem key={index} deliverydate={deliverydate} item={item} currentstate={currentstate} changecurrentstate={changecurrentstate} />
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
                    <SimpleBar style={{ height: "20vh" }}>
                        {Object.keys(cart).map((item, index) => {
                            return (
                                <div className="paymentdetailsitem" key={index}>
                                    <div>
                                        {item} X {allitems[item].count}
                                    </div>

                                    <div>
                                        {allitems[item].count * allitems[item].price}
                                    </div>
                                </div>
                            )
                        })}

                        <div className="paymentdetailsitem">
                            <div>
                                <strong>Total Price</strong>
                            </div>

                            <div>
                                <strong>{totalcost}</strong>
                            </div>
                        </div>
                    </SimpleBar>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="bordernone bg-warning p-2 rounded-pill">Checkout </button>
                    </div>
                </div>}
                <div className="usercartsection"></div>
            </div>
        </>
    )
}

export default Usercart