import { useSelector } from "react-redux"
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
export const Ordersummary = ({ordersummaryclass}) => {
    const allitems = useSelector(state => state.Itemslist)
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
                                        {item} X {allitems[item].count}
                                    </div>

                                    <div>
                                        {allitems[item].count * allitems[item].price}
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