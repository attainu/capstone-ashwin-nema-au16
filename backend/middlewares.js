const UserModel = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRET_KEY} = process.env
async function verify_mobile_number(Mobilenumber) {
    const regx = /^[7-9][0-9]{9}$/

    try {
        var user = await UserModel.findOne({Mobilenumber})
    } catch (error) {
        return "Please provide a valid mobile number"
    }

    if (user) {
        return "User with the same mobile number is already exists"
    }

    if (!regx.test(Mobilenumber) ) return "Please provide a valid mobile number"

    return true
}

async function verify_email(Email) {
    try {
        var user = await UserModel.findOne({Email})
    } catch(error) {
        return "Please provide a valid email"
    }
    const regx = /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/

    if (user) {
        return "User with the same email is already present"
    }

    if (!regx.test(Email)) return "Please provide a valid email"
    return true
}

function accesstokengenerator(id) {
    return jwt.sign({id}, SECRET_KEY, {expiresIn:'24hr'})
}

module.exports = {verify_mobile_number, verify_email, accesstokengenerator}