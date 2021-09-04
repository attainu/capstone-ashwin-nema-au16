import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
export const Viewcartoption = ({selectcomponenttodisplay , changedisplaycomponent}) => {
    const changecursor = selectcomponenttodisplay === "mycart" ? "" : "cursorpointer"
    const showcart = () => {
        changedisplaycomponent("mycart")
    }

    return (
        <>
        <div onClick={showcart} className={`mt-5 p-2 d-flex justify-content-center profilecontentdisplaycolor ${changecursor}`}>
            <span>
            View your cart
            </span>
            <ShoppingBasketIcon style={{ color: "red" }} />
        </div>
        </>
    )
}