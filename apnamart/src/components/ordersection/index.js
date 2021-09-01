import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
export const OrderSection = () => {
    const opacity = useSelector(state => state.opacity)
    const orderref = useRef()

    useEffect(() => {
        if (orderref.current !== null && orderref.current !== undefined) {
            switch (opacity) {
                case 1:
                    orderref.current.style.backgroundColor = "white"
                    return

                case 0.5:
                    orderref.current.style.backgroundColor = "rgb(0, 0, 0,0.1)"
                    return

                default:
                    return
            }
        }
    }, [opacity])

    return (
        <>
        <div ref={orderref} className="mt-5 p-2 d-flex profilecontentdisplaycolor">
            <div className="flex-grow-1">
                My Orders
            </div>
            <DoubleArrowIcon  />
        </div>
        </>
    )
}