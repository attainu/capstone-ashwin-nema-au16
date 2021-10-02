import './index.css'
import { useSelector } from 'react-redux'
import { useEffect, useState, useContext } from 'react'
import { PATHS } from '../../config';
import { NotificationModal, CustomModalNotificationComponent, CartItemDetails, PriceDetailsSummary } from '../../components'
import { ProductsdataloadedContext } from '../../utils'
import useMediaQuery from '@mui/material/useMediaQuery'
const Usercart = ({ nomargin }) => {
    const { Cart, Profile, Auth: { loginstate } } = useSelector(state => state)
    const count = Object.keys(Cart).length

    const [modalactivator, activatemodal] = useState(Object.keys(Profile).length > 0)
    const [modal, showmodal] = useState(false)
    const productsdataisloaded = useContext(ProductsdataloadedContext)
    const cartlayoutquery = useMediaQuery('(max-width:700px)')
    const props = {cartlayoutquery, nomargin}

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
    }, [showmodal, count, modalactivator, loginstate])
    return (
        <>
            {
                productsdataisloaded &&
                <>
                    <div className={`usercart ${nomargin === undefined && cartlayoutquery && "usercartmargin"} ${nomargin !== undefined && cartlayoutquery && "me-5"}`}>
                        <div className="usercartsection "></div>

                        <CartItemDetails {...props} />
                        {count > 0 && <PriceDetailsSummary {...props} />}

                        <div className="usercartsection"></div>
                    </div>
                    <NotificationModal show={modal} centered={true} onHide={showmodal} alertvariant="info" additionalcustomcomponent={true} Customcomponent={<CustomModalNotificationComponent message="You are not logged in." linkmessage="Click Here to" link={PATHS.LOGIN} linktext="Login" />} />
                </>
            }
        </>
    )
}

export default Usercart