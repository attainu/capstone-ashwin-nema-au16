import Radio from '@mui/material/Radio';
import { RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { deliverydate,  showmodalwithmessageandvariant, gotohome, logouterros, OnlineContext } from '../../utils'
import { useState, useContext } from "react";
import {axiosinstance} from '../../config'
import {NotificationModal} from '../Notification Modal'
import {authsetter, storeordercount} from '../../actions'

export default function PaymentSection({history, DeliveryAddress, PATHS}) {
    const isonline = useContext(OnlineContext)
    const dispatch = useDispatch()
    const {Profile:{ Name, Email, Mobilenumber }, Cart,CartPrice:cartprice, Userorderdata:{count} } = useSelector(state => state)
    const [modalmessage, changemodalmessage] = useState("")
    const [modal, showmodal] = useState(false)
    const [modalvariant, changemodalvariant] = useState("warning")
    const [paymentmode, changepaymentmode] = useState("Cash")

    const displaymodal = (message, variant) => {
        showmodalwithmessageandvariant(showmodal, message,changemodalmessage, variant, changemodalvariant)
        if (message === "Your order is successfully placed") {
            setTimeout(() => {
                history.push(PATHS.HOME)
            }, 2000);
        }
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {

                resolve(true);
            };
            script.onerror = () => {

                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const setloginerror = (error) => {
        if (logouterros[error] !== undefined) {
            displaymodal("Sorry you have been logged out. Please login again to continue placing order", "danger")
            gotohome(dispatch)
            return true
        }
        return false
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            displaymodal("Sorry Razorpay could not be loaded. Please use cash payment mode or try again later", "danger")
            return;
        }

        const generatedrazorpayorder = await axiosinstance.post('/user/order/payment/razorpay', { items:Cart,cartprice})

        if (!generatedrazorpayorder) {
            displaymodal("You are not online. Please be online if you want to place order", "danger")
            return;
        }

        const loginerror = setloginerror(generatedrazorpayorder.data.error)

        if (generatedrazorpayorder.data.error !== undefined && !loginerror) {
            displaymodal(generatedrazorpayorder.data.error, "danger")
            return
        }

        if (generatedrazorpayorder.data.error === undefined) {

            const { amount, id: order_id, currency, OrderedItems, Price, newtoken } = generatedrazorpayorder.data;
            dispatch(authsetter(newtoken))
            const options = {
                key: "rzp_test_lYaL0slH0VoZzj", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "Apnamart",
                image: "https://res.cloudinary.com/ash006/image/upload/v1622457972/shop_myswcw.jpg",
                description: "",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const successresponse = await axiosinstance.post("/user/order/payment/razorpay/success", {OrderedItems, ...data, Price, DeliveryAddress})

                    if (!successresponse) {
                        displaymodal("Sorry something went wrong your order could not be placed.", "danger")
                        return
                    }

                    const {data:responsedata} = successresponse
                    const {success, error} = responsedata
                    if (success === true) {
                        dispatch(storeordercount(count + 1))
                        displaymodal("Your order is successfully placed", "warning")
                        return
                    }
                    const loginerror = setloginerror(error) 
                    if (loginerror === true) {
                        return
                    }
                    displaymodal(error,"danger")
                },
                prefill: {
                    name: Name,
                    email: Email,
                    contact: Mobilenumber,
                },
                notes: {
                    address:DeliveryAddress,
                },
                theme: {
                    color: "#ffc107",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }

    }

    const cashmode = () => {
        if (isonline !== true) {
            displaymodal("You are not online. Please check your Internet connection and try again later", "danger")
            return
        }
        axiosinstance.post("/user/order/cash", {items:Cart, cartprice, DeliveryAddress}).then(({data}) => {
            const loginerror = setloginerror(data.error)
            if (data.error !== undefined && !loginerror) {
                displaymodal(data.error, "danger")
                return
            }

            if (loginerror) {
                return
            }
            dispatch(storeordercount(count + 1))
            displaymodal("Your order is successfully placed", "warning")
        }).catch(() => {
            displaymodal("Sorry your order could not be placed. Please try again later", "danger")
        }

        )
    }

    return (
        <>
            <div className="checkoutaccordion mt-5">
                <div className="w-75 profilecontentdisplaycolor">
                    <Alert variant="info" className="w-25">
                        Delivery by {deliverydate}
                    </Alert>
                    <h5>Select mode of payment</h5>
                    <FormControl className="w-100 profilecontentdisplaycolor" component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="Cash">
                            <FormControlLabel
                                label="Cash on delivery"
                                value="Cash"
                                onClick={() => changepaymentmode("Cash")}
                                control={<Radio color="primary" />}
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="Razorpay"
                                onClick={() => changepaymentmode("Razorpay")}
                                control={<Radio color="primary" />}
                                label="Razorpay"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                    {
                        paymentmode === "Cash" ? <button onClick={cashmode} className="bordernone p-2 rounded-pill bg-warning mt-3" >
                            Continue <DoubleArrowIcon />
                        </button> : <button onClick={displayRazorpay} className="bordernone p-2 rounded-pill bg-warning mt-3" >
                            Continue <DoubleArrowIcon />
                        </button>
                    }
                </div>
            </div>

            <NotificationModal show={modal} centered={true} currentmodalmessage={modalmessage} onHide={showmodal} alertvariant={modalvariant} successmessage="Your order is successfully placed" />
        </>
    )
}