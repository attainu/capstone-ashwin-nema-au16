import { useSelector } from "react-redux"
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';

export const Ordersummary = ({ordersummaryclass}) => {
    const totalcost = useSelector(state => state.CartPrice)
    const cart = useSelector(state => state.Cart)
    const mainclass = ordersummaryclass !== undefined ? ordersummaryclass : ""
    const Productsdata = useSelector(state => state.Productsdata.products)
    return (
        <>
        <SimpleBar style={{ height: "20vh" }}>
                        {Object.keys(cart).map((item, index) => {
                            const {count, price} = cart[item]
                            const {name} = Productsdata[item]
                            return (
                                <div className={`${mainclass}`} key={index}>
                                    <div>
                                        {name} X {count}
                                    </div>

                                    <div>
                                        {count * price}
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