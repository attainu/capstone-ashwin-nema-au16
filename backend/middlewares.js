const UserModel = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env
const bcrypt = require('bcrypt')

async function verify_mobile_number(Mobilenumber) {
    const regx = /^[7-9][0-9]{9}$/

    try {
        var user = await UserModel.findOne({ Mobilenumber })
    } catch (error) {
        return "Please provide a valid mobile number"
    }

    if (user) {
        return "User with the same mobile number is already exists"
    }

    if (!regx.test(Mobilenumber)) return "Please provide a valid mobile number"

    return true
}

async function verify_email(Email) {
    try {
        var user = await UserModel.findOne({ Email })
    } catch (error) {
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
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: '24hr' })
}

async function validate_mobile_number(Mobilenumber, id) {
    try {
        const regx = /^[7-9][0-9]{9}$/
        if (regx.test(Mobilenumber) === false) {
            return false
        }

        const user = await UserModel.findById(id)
        if (user != null) {
            return user._id
        }
        return id
    
    } catch {
        return false
    }
}

async function validate_email(Email, id) {
    try {
        const regx = /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/
        if (regx.test(Email) === false) {
            return false
        }

        const user = await UserModel.findById(id)
        if (user != null) {
            return user._id
        }
        return id
    } catch {
        return false
    }
}


async function validate_password(Password, id) {
    try {
        const user = await UserModel.findById(id)
        const isMatching = await bcrypt.compare(Password, user.Password)

        if (isMatching === true) {
            return true
        }
        return false

    } catch {
        return false
    }
}

module.exports = { verify_mobile_number, verify_email, accesstokengenerator, validate_mobile_number, validate_email, validate_password }