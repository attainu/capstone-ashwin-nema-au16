const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token')
require('dotenv').config()
const { SECRET_KEY } = process.env

function accesstokengenerator(id) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: '168h' })
}

// async function newtokengenerator (id) {
//     const newtoken = new TokenModel({userid: id})
//     const usertoken = await newtoken.save()
//     return usertoken._id
// }

async function authenticatetoken(req, res, next) {
    try {
        const token = req.headers.auth
        if (!token) return res.json({ error: "Token is not provided" })
        const verifieduser =  jwt.verify(token, SECRET_KEY)
        req.verifieduser = verifieduser.id
        next()
    } catch(error) {
        return res.json({error:"Please provide a valid token"})
    }
}

module.exports = {  accesstokengenerator, authenticatetoken  }