const {nanoid} = require('nanoid')

const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    Customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    Status:{
        type:String,
        default:"Order placed"
    },

    OrderedItems:{
        type:Object,
        required:true
    },

    Price:{
        type:Number,
        required:true
    },

    PaymentMode:{
        type:String,
        default:'Cash on delivery'
    },

    PaymentId:{
        type:String,
        default:() => nanoid()
    },

    CreatedAt:{
        type:Date,
        default:Date.now,
    },

    DeliveryAddress:{
        type:String,
        required:true
    },

    OrderCancellationTime:{
        type:Date
    }
})

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel