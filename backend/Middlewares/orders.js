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
    let totalprice = 0
    const ordereditems = originaldata.reduce((allpurchasedproducts, item) => {
        const { _id, price } = item
        const { count } = userorderdetails[_id]
        totalprice += (price * count)
        allpurchasedproducts[_id] = { price, count }
        return allpurchasedproducts
    }, {})

    return { ordereditems, price: totalprice }
}

const orderauthenticationandgeneration = async (req, res, next) => {
    const {cartprice} = req.body
    try {
        const data1 = await ItemModel.find({ '_id': { $in: Object.keys(req.body.items) } }, `_id price`);
        const data2 = await ItemModel2.find({ '_id': { $in: Object.keys(req.body.items) } }, `_id price`);

        if ((data1.length + data2.length) !== Object.keys(req.body.items).length) {
            return res.json({ error: "Order provided is not valid" })
        }

        if (verifyproductcount(Object.values(req.body.items)) !== true) {
            return res.json({ error: "Order provided cannot be verified" })
        }

        const { ordereditems, price } = finalorderandprice([...data1, ...data2], req.body.items)
        if (price !== cartprice) {
            return res.json({error: "Please do not maniplulate prices"})
        }
        delete req.body.items
        req.neworder = {ordereditems, price}
        next()
    } catch {
        res.json({error:"Sorry something went wrong"})
    }
}

const getorderdata = async (id) => {
    const userorderdata = await OrderModel.aggregate([
        { $match:{Customer: mongoose.Types.ObjectId(id)} },
        {$project:{_id:1, status:1, price:1, ordereditems:1, paymentid:1, paymentmode:1, createdAt:1 } },
        {$sort:{createdAt:-1}}
    ])
    
    return userorderdata
}

module.exports = {  orderauthenticationandgeneration, getorderdata }