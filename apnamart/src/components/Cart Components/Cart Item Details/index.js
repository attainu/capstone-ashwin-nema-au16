import { useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react';
import { Cartitem } from '../Cart item'
import { EmptyCart } from '../Empty Cart'
import 'simplebar/dist/simplebar.min.css';

export const CartItemDetails = ({nomargin ,cartlayoutquery}) => {
    const { Cart } = useSelector(state => state)
    const count = Object.keys(Cart).length
    return (
        <div className={`profilecontentdisplaycolor usercartsectionitems px-3 py-3 me-3 ${cartlayoutquery && "w-100"} ${cartlayoutquery && nomargin !== undefined && "mb-3" } ${nomargin === undefined && "mt-5"}`}>
            <h5>My Cart{count > 0 ? <>({count}) </> : <></>}</h5>
            {count === 0 && <EmptyCart />}

            {count > 0 && <>
                <SimpleBar style={{ height: "60vh" }}>
                    {Object.keys(Cart).map((item, index) => {
                        const count = Cart[item].count
                        return (
                            <Cartitem key={index} item={item} count={count} />
                        )
                    })}
                </SimpleBar>
            </>}
        </div>
    )
}