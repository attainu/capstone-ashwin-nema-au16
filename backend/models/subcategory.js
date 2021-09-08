const mongoose = require('mongoose')
const SubcategorySchema = new mongoose.Schema({
    name: String,
    image:String,
    categories: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
})

const SubcategoryModel = mongoose.model('Subcategory', SubcategorySchema)
module.exports = SubcategoryModel