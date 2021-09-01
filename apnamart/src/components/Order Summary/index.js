import { useSelector } from "react-redux"
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import {Productsdata} from '../../Data'
export const Ordersummary = ({ordersummaryclass}) => {
    const totalcost = useSelector(state => state.CartPrice)
    const cart = useSelector(state => state.Cart)
    const mainclass = ordersummaryclass !== undefined ? ordersummaryclass : ""
    
    return (
        <>
        <SimpleBar style={{ height: "20vh" }}>
                        {Object.keys(cart).map((item, index) => {
                            return (
                                <div className={`${mainclass}`} key={index}>
                                    <div>
                                        {item} X {cart[item].count}
                                    </div>

                                    <div>
                                        {cart[item].count * Productsdata[item].price}
                                    </div>
                                </div>
                            )
                        })}

                        <div className={`${mainclass}`}>
                            <div>
                                <strong>Total Price</strong>
                            </div>

                            <div>
                                <strong>{totalcost}</strong>
                            </div>
                        </div>
                    </SimpleBar>
        </>
    )   
}