import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getuseraddress } from '../../actions'
import { Accordion } from 'react-bootstrap'
import { PATHS } from '../../config'
import { Ordersummary, MapAccordion, PaymentSection, EmptyCart } from '../../components'
import { SetAddressContext } from '../../utils'
import { withAuthentication } from '../../Higher Order Components'
import useMediaQuery from '@mui/material/useMediaQuery'

const CheckoutPage = ({ history }) => {
    const dispatch = useDispatch()

    const { Useraddress, Profile } = useSelector(state => state)
    const { Location } = Profile
    const [userlocationaddress, setcurrentaddress] = useState([])
    const [isaddressset, setaddress] = useState(false)

    const cart = useSelector(state => state.Cart)
    const count = Object.keys(cart).length

    const ordersummaryquery = useMediaQuery('(max-width:550px)')

    useEffect(() => {
        if (Useraddress.length === 0 && Object.keys(Profile).length > 0) {
            dispatch(getuseraddress(Location[0], Location[1]))
        }

        if (isaddressset === false && Useraddress.length !== 0) {
            setcurrentaddress(Useraddress)
            setaddress(true)
        }

    }, [Useraddress, Profile, isaddressset, dispatch, Location])

    return (
        <>
        {
            count > 0 ?
            <>
            <SetAddressContext.Provider value={setaddress} >
                <MapAccordion userlocationaddress={userlocationaddress} />
            </SetAddressContext.Provider>
            
            <div className="checkoutaccordion mt-5">
                <Accordion className={`${ordersummaryquery === true?"w-100":"w-75" } `} defaultActiveKey="0">
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

            <PaymentSection history={history} DeliveryAddress={`${userlocationaddress.join(", ")}`} PATHS={PATHS} />
        </> :
        <EmptyCart /> 
        }
        </>
    )
}

export default withAuthentication(CheckoutPage)