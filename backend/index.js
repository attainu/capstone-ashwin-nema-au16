const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const cors = require('cors')
const databaseconnection = require('./database')

const products_router = require('./routes/products')
const user_router = require('./routes/user')
const order_router = require('./routes/order')
app.use(
    cors({
        origin: 'http://localhost:3000' || process.env.PORT
    })
)

app.use("", products_router)
app.use("/user", user_router)
app.use("/user/order", order_router)


app.listen(5000, () => databaseconnection())