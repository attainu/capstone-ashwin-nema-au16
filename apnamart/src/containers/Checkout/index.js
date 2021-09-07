import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getuseraddress } from '../../actions'
import { Accordion } from 'react-bootstrap'
import { PATHS } from '../../config'
import { Ordersummary, MapAccordion, PaymentSection } from '../../components'
import { SetAddressContext } from '../../utils'

const CheckoutPage = ({ history }) => {
    const dispatch = useDispatch()
    const useraddress = useSelector(state => state.Useraddress)
    const userprofile = useSelector(state => state.Profile)
    const { Location } = userprofile
    const [userlocationaddress, setcurrentaddress] = useState([])
    const [isaddressset, setaddress] = useState(false)
    const cart = useSelector(state => state.Cart)
    const count = Object.keys(cart).length

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
                    <SetAddressContext.Provider value={setaddress} >
                        <MapAccordion userlocationaddress={userlocationaddress} setaddress={setaddress} />
                    </SetAddressContext.Provider>

                    <div className="checkoutaccordion mt-5">
                        <Accordion className="w-75" defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div>
                                        <div>
                                            Order Summary
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="space-between">
                                        <div><strong>Items({count})</strong> </div>
                                        <div><strong>Price</strong> </div>
                                    </div>

                                    <Ordersummary ordersummaryclass="space-between" />
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