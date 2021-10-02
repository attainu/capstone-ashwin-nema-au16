import { Alert } from "react-bootstrap"
export const EmptyCart = () => {
    return (
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">
            <div className="emptycartimagecontainer">
                <img className="emptycartimage" src="https://res.cloudinary.com/ash006/image/upload/v1629823207/7077465-removebg-preview_nsotp8.png" alt="empty cart" />
            </div>
            <Alert variant="danger">
                <p>Your cart is empty. Please add something to the cart</p>
            </Alert>
        </div>
    </div>
    )
}