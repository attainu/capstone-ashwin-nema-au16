const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

function accesstokengenerator(id) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: '24hr' })
}

function authenticatetoken(req, res, next) {
    try {
        const token = req.headers.auth
        if (!token) return res.json({ error: "Token is not provided" })
        const verifieduser =  jwt.verify(token, SECRET_KEY)
        req.verifieduser = verifieduser
        next()
    } catch(error) {
        return res.json({error:"Please provide a valid token"})
    }
}

module.exports = {  accesstokengenerator, authenticatetoken  }