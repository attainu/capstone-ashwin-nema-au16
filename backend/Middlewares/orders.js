const ItemModel = require("../models/items")
const ItemModel2 = require("../models/items2")
const OrderModel = require("../models/order")
const mongoose = require('mongoose')

const verifyproductcount = (productscount) => {
    for (i = 0; i < productscount.length; i++) {
        if (typeof productscount[i].count !== "number") {
            return false
        }
        if (productscount[i].count > 20 || productscount[i].count < 1) {
            return false
        }
    }

    return true
}

const finalorderandprice = (originaldata, userorderdetails) => {
    let Price = 0
    const OrderedItems = originaldata.reduce((allpurchasedproducts, item) => {
        const { _id, price } = item
        const { count } = userorderdetails[_id]
        Price += (price * count)
        allpurchasedproducts[_id] = { price, count }
        return allpurchasedproducts
    }, {})

    return { OrderedItems, Price }
}

const orderauthenticationandgeneration = async (req, res, next) => {
    const { cartprice } = req.body
    try {
        const data1 = await ItemModel.find({ '_id': { $in: Object.keys(req.body.items) } }, `_id price`);
        const data2 = await ItemModel2.find({ '_id': { $in: Object.keys(req.body.items) } }, `_id price`);

        if ((data1.length + data2.length) !== Object.keys(req.body.items).length) {
            return res.json({ error: "Order provided is not valid" })
        }

        if (verifyproductcount(Object.values(req.body.items)) !== true) {
            return res.json({ error: "Order provided cannot be verified" })
        }
        const { OrderedItems, Price } = finalorderandprice([...data1, ...data2], req.body.items)
        if (Price !== cartprice) {
            return res.json({ error: "Cartprice and Price do not match" })
        }
        delete req.body.items
        req.neworder = { OrderedItems, Price }
        next()
    } catch {
        res.json({ error: "Sorry something went wrong" })
    }
}

const getuserordercount = async (id) => {
    const count = await OrderModel.aggregate([
        { $match: { Customer: mongoose.Types.ObjectId(id) } },
        { $count: "count" }
    ])

    return count
}

const getuserorderdata = async (id, skip) => {

    const userorders = await OrderModel.aggregate([
        { $match: { Customer: mongoose.Types.ObjectId(id) } },
        { $project: { _id: 1, Status: 1, PaymentMode: 1, Price: 1, OrderedItems: 1, DeliveryAddress: 1, CreatedAt: 1, PaymentId: 1, OrderCancellationTime: 1 } },
        { $sort: { CreatedAt: -1 } },
        { $skip: skip },
        { $limit: 5 }
    ])

    return userorders
}

const canorderbeedited = (ordertime) => {
    const currenttime = new Date()
    const dividingfactor = 60 * 60 * 24
    const difference = (currenttime.getTime() - ordertime.getTime()) / 1000
    const timepassed = difference / dividingfactor
    if (timepassed < 1) {
        return true
    } 
    return false
}

module.exports = { orderauthenticationandgeneration, getuserorderdata, getuserordercount, canorderbeedited }