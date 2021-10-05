import './index.css'
import { useSelector } from 'react-redux'
import { useEffect, useContext } from 'react'
import {  CartItemDetails, PriceDetailsSummary } from '../../components'
import { ProductsdataloadedContext } from '../../utils'
import useMediaQuery from '@mui/material/useMediaQuery'
const Usercart = ({ nomargin }) => {
    const { Cart  } = useSelector(state => state)
    const count = Object.keys(Cart).length
    const productsdataisloaded = useContext(ProductsdataloadedContext)
    const cartlayoutquery = useMediaQuery('(max-width:700px)')
    const props = {cartlayoutquery, nomargin}

    useEffect(() => {
        document.body.style.backgroundColor = "#f1f3f6"
        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [])
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
                </>
            }
        </>
    )
}

export default Usercart