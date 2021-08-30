import './index.css'
import MapAccordion from './mapaccordian'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getuseraddress } from '../../actions'
import { Accordion } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import PaymentSection from './paymentsection'
import { PATHS } from '../../config'

const CheckoutPage = ({ history }) => {
    const dispatch = useDispatch()
    const useraddress = useSelector(state => state.Useraddress)
    const userprofile = useSelector(state => state.Profile)
    const { Location } = userprofile
    const [userlocationaddress, setcurrentaddress] = useState([])
    const [isaddressset, setaddress] = useState(false)
    const cart = useSelector(state => state.Cart)
    const count = useSelector(state => state.cartcount)
    const allitems = useSelector(state => state.Itemslist)
    const totalcost = useSelector(state => state.CartPrice)

    let date = new Date()
    date.setDate(date.getDate() + 3)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const deliverydate = days[date.getDay()] + " " + date.getDate() + " " + month[date.getMonth()]

    useEffect(() => {
        if (useraddress.length === 0 && Object.keys(userprofile).length > 0) {
            dispatch(getuseraddress(Location[0], Location[1]))
        }

        if (isaddressset === false && useraddress.length !== 0) {
            setcurrentaddress(useraddress)
            setaddress(true)
        }

    }, [useraddress, userprofile, isaddressset, dispatch, Location])

    useEffect(() => {
        if (Location === undefined) {
            history.push(PATHS.HOME)
        }
    }, [Location, history])

    return (
        <>
            {Location !== undefined && count > 0 &&

                <>
                    <MapAccordion userlocationaddress={userlocationaddress} setaddress={setaddress} />
                    <div className="checkoutaccordion mt-5">
                        <Accordion className="w-75" defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Order Summary</Accordion.Header>
                                <Accordion.Body>
                                    <div className="checkoutsummary">
                                        <div><strong>Items({count})</strong> </div>
                                        <div><strong>Price</strong> </div>
                                    </div>

                                    <SimpleBar style={{ height: "20vh" }}>
                                        <div>
                                            Deliver by {deliverydate}
                                        </div>
                                        {Object.keys(cart).map((item, index) => {
                                            return (
                                                <div className="checkoutsummary" key={index}>
                                                    <div>
                                                        {item} X {allitems[item].count}
                                                    </div>

                                                    <div>
                                                        {allitems[item].count * allitems[item].price}
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className="checkoutsummary">
                                            <div>
                                                <strong>Total Price</strong>
                                            </div>

                                            <div>
                                                <strong>{totalcost}</strong>
                                            </div>
                                        </div>
                                    </SimpleBar>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div>
                    <PaymentSection />
                </>
            }
        </>
    )
}

export default CheckoutPage