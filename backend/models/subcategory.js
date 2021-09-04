const mongoose = require('mongoose')
const SubcategorySchema = new mongoose.Schema({
    name: String,
    imageurl:String
})

const SubcategoryModel = mongoose.model('Subcategory', SubcategorySchema)
module.exports = SubcategoryModel