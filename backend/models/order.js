const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    Customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    status:{
        type:String,
        default:"Order placed"
    },

    ordereditems:{
        type:Object,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    paymentmode:{
        type:String,
        default:'Cash on delivery'
    },

    paymentid:String,

    createdAt:{
        type:Date,
        default:Date.now,
    },

    deliveryaddress:{
        type:String,
        required:true
    }
})

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel