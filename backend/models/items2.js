const mongoose = require('mongoose')
const ItemSchema2 = new mongoose.Schema({
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
    description: Array,
    details: Object
})

const ItemModel2 = mongoose.model('Moreitems', ItemSchema2)
module.exports = ItemModel2