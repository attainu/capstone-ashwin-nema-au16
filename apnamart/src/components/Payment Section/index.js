import axios from "axios";
import Radio from '@material-ui/core/Radio';
import { RadioGroup, FormControlLabel, FormControl } from '@material-ui/core'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import {deliverydate} from '../../utils'
export default function PaymentSection() {
    const {Name, Email, Mobilenumber} = useSelector(state => state.Profile)
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

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/user/order/payment/razorpay");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        const { amount, id: order_id, currency } = result.data;

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
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                await axios.post("http://localhost:5000/user/order/payment/razorpay/success", data);
            },
            prefill: {
                name: Name,
                email: Email,
                contact: Mobilenumber,
            },
            notes: {
                address: "So ",
            },
            theme: {
                color: "#ffc107",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
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
                                control={<Radio color="primary" />}
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="Razorpay"
                                onClick={displayRazorpay}
                                control={<Radio color="primary" />}
                                label="Razorpay"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                    <button  className="bordernone p-2 rounded-pill bg-warning mt-3" >
                        Continue <DoubleArrowIcon />
                    </button>
                </div>
            </div>

        </>
    )
}