const mongoose = require('mongoose')
const ItemsSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    categories: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ],
    subcategories: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subcategory'
        }
    ],
    description: String,
    details: Object
})

const ItemModel = mongoose.model('Item', ItemsSchema)
module.exports = ItemModel