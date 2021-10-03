import { Ordersummary } from '../../Order Summary'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { PATHS } from '../../../config'

export const PriceDetailsSummary = ({ nomargin, cartlayoutquery }) => {
    const { Profile } = useSelector(state => state)
    return (
        <>
            <div className={`profilecontentdisplaycolor pe-3 ps-3 py-3 h-100 usercartpaymentsection  ${cartlayoutquery && "mb-3 w-100"} ${nomargin === undefined && "mt-5"}`}>
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
                            <Button className="bg-warning text-dark p-2" variant="contained" color="primary">
                                Checkout
                            </Button>
                        </Link>

                    }
                </div>
            </div>
        </>
    )
}