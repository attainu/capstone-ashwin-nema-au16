const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
require('dotenv').config()
const { MONGODB_URL} = process.env
const cors = require('cors')

const products_router = require('./routes/products')
const user_router = require('./routes/user')
const order_router = require('./routes/order')
app.use(
    cors({
        origin: 'http://localhost:3000' || process.env.PORT
    })
)

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, async (err) => {
    if (err) throw err
    console.log("connected")
    
})

app.use("", products_router)
app.use("/user", user_router)
app.use("/user/order", order_router)



app.listen(5000)