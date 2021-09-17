const express = require('express')
const ItemModel = require('../models/items')
const ItemModel2 = require('../models/items2')
const SubcategoryModel = require('../models/subcategory')
const CategoryModel = require('../models/category')
const OrderModel = require('../models/order')
const mongoose = require('mongoose')
const products_router = express.Router()
products_router.use(express.urlencoded({ extended: true }))

products_router.post("/products", async (_, res) => {
    try {
        const allitemms = await ItemModel.find({})
        const remainingitems = await ItemModel2.find({})
        const allsubcategories = await SubcategoryModel.find({})
        const allcategories = await CategoryModel.find({})
        return res.json({ products: [...allitemms, ...remainingitems], subcategories: [...allsubcategories], categories: [...allcategories] })
    } catch (error) {
        return res.status(404).send("Products data not found")
    }
})

products_router.post("/subcategory/:id", async (req, res) => {
    try {
        const result1 = await ItemModel.aggregate([
            { $match: { subcategories: mongoose.Types.ObjectId(req.params.id) } },
            { $project: { _id: 1 } }
        ])

        const result2 = await ItemModel2.aggregate([
            { $match: { subcategories: mongoose.Types.ObjectId(req.params.id) } },
            { $project: { _id: 1 } }
        ])
        const subcategorydata = [...result1, ...result2]
        if (subcategorydata.length == 0) {
            return res.status(404).send("Subcategory data not found")
        }
        return res.json(subcategorydata)
    }
    catch {
        return  res.status(404).send("Subcategory data not found")
    }

})

products_router.post("/category/:id", async (req, res) => {
    try {
        const result1 = await ItemModel.aggregate([
            { $match: { categories: mongoose.Types.ObjectId(req.params.id) } },
            { $project: { _id: 1, name: 1 } }
        ])

        const result2 = await ItemModel2.aggregate([
            { $match: { categories: mongoose.Types.ObjectId(req.params.id) } },
            { $project: { _id: 1, name: 1 } }
        ])

        const categorydata = [...result1, ...result2] 
        if (categorydata.length == 0) {
            return res.status(404).send("Category data not found")
        }
        return res.json(categorydata)
    }
    catch {
        return res.status(404).send("Category data not found")
    }
})

module.exports = products_router