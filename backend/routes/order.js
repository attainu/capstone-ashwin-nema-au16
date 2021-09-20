const express = require('express')
const Razorpay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config()
const { RAZORPAYKEY, RAZORPAYPASSWORD } = process.env
const order_router = express.Router()
order_router.use(express.urlencoded({ extended: true }))

const {  orderauthenticationandgeneration, getuserorderdata } = require('../middlewares/orders')
const OrderModel = require('../models/order')

const { authenticatetoken, accesstokengenerator } = require('../middlewares/token')
const mongoose = require('mongoose')

order_router.post("/payment/razorpay", authenticatetoken, orderauthenticationandgeneration, async (req, res) => {
    const {OrderedItems, Price } = req.neworder
    try {
        var instance = new Razorpay({
            key_id: RAZORPAYKEY,
            key_secret: RAZORPAYPASSWORD,
        });

        const options = {
            amount: Price * 100, // amount in smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        if (!order) return res.json({error:"Sorry Razorpay is currently not working. Please try again later"})
        const newtoken = accesstokengenerator(req.verifieduser)
        return res.json({...order,OrderedItems, Price, newtoken});
    } catch (error) {
        return res.json({error:"Sorry Razorpay is currently not working. Please try again later"})
    }
});

order_router.post("/payment/razorpay/success", authenticatetoken,  async (req, res) => {
    const {
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        OrderedItems,
        Price, 
        DeliveryAddress
    } = req.body

    try {
        let hmac = crypto.createHmac('sha256', RAZORPAYPASSWORD)
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generated_signature = hmac.digest('hex')
        if (razorpaySignature !== generated_signature) {
            return res.json({ error: "Sorry an error occurred while making payment" })
        }
        const userorder = { Customer: mongoose.Types.ObjectId(req.verifieduser), OrderedItems, Price, PaymentId:razorpayPaymentId,PaymentMode:"Razorpay", DeliveryAddress  }
        const finalorder = new OrderModel(userorder)
        await finalorder.save()
        return res.json({ success: true })
    } catch (error) {
        res.status(500).send(error);
    }
})

order_router.post("/cash", authenticatetoken, orderauthenticationandgeneration, async (req, res) => {
    const { OrderedItems, Price} = req.neworder
    const {DeliveryAddress} = req.body
    try {
        const userorder = { Customer: mongoose.Types.ObjectId(req.verifieduser), Price, OrderedItems, DeliveryAddress }
        const finalorder = new OrderModel(userorder)
        await finalorder.save()
        return res.json({ success: true })

    } catch (error) {
        return res.json({ error: "Sorry something went wrong. Your order could not be placed" })

    }
})

order_router.post("/data/:skip", authenticatetoken, async (req, res) => {
    try {
        const data = await getuserorderdata(req.verifieduser, Number(req.params.skip))
        return res.json(data)
    } catch(error) {
        return res.json({error:true})
    }
})

order_router.post("/orderdetails/:id", authenticatetoken, async (req, res) => {
    try {
        const order = await OrderModel.aggregate([
            {$match: {Customer: mongoose.Types.ObjectId(req.verifieduser), _id:mongoose.Types.ObjectId(req.params.id) }},
            {$project:{_id:1, Status:1, PaymentMode:1, Price:1, OrderedItems:1, DeliveryAddress:1, CreatedAt:1, PaymentId:1, OrderCancellationTime:1}}
        ])
        if (order.length == 0) {
            return res.status(404).json({error:"Data not fetched"})
        }
        return res.json(order[0])
    } catch {
        res.status(404).json({error:"Data not fetched"})
    }
})

module.exports = order_router