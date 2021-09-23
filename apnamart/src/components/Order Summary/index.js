import { useSelector } from "react-redux"
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';

export const Ordersummary = ({ ordersummaryclass }) => {
    const { CartPrice, Cart, Productsdata: { products } } = useSelector(state => state)
    const mainclass = ordersummaryclass !== undefined ? ordersummaryclass : ""
    return (
        <>
            <SimpleBar style={{ height: "20vh" }}>
                {
                    Object.keys(products).length > 0 && <>
                        {Object.keys(Cart).map((item, index) => {
                            const { count } = Cart[item]
                            const { name, price } = products[item]
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
                    </>
                }

                <div className={`${mainclass}`}>
                    <div>
                        <strong>Total Price</strong>
                    </div>

                    <div>
                        <strong>{CartPrice}</strong>
                    </div>
                </div>
            </SimpleBar>
        </>
    )
}