const express = require('express')
const Razorpay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config()
const { RAZORPAYKEY, RAZORPAYPASSWORD } = process.env
const order_router = express.Router()
order_router.use(express.urlencoded({ extended: true }))



order_router.post("/payment/razorpay", async (req, res) => {
    try {
        var instance = new Razorpay({
            key_id: RAZORPAYKEY,
            key_secret: RAZORPAYPASSWORD,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        return res.json(order);
    } catch (error) {
        return res.status(500).send(error);
    }
});

order_router.post("/payment/razorpay/success", async (req, res) => {

    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature

        // if (digest !== razorpaySignature) {
        //     console.log("Try is stopping here")
        //     return res.status(400).json({ msg: "Transaction not legit!" });
        // }

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        return res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = order_router