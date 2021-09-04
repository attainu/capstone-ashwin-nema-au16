const UserModel = require('../models/user')
require('dotenv').config()
const bcrypt = require('bcrypt')

async function validate_mobile_number(Mobilenumber, id) {
    try {
        const regx = /^[7-9][0-9]{9}$/
        if (regx.test(Mobilenumber) === false) {
            return false
        }

        const user = await UserModel.find({Mobilenumber:Mobilenumber})

        switch (user.length) {
            case 0:
                return id
            
            case 1:
                if (user[0]._id == id) {
                    return id
                }
                return false
            
            default:
                return false
        }

    } catch {
        console.log("Error occurred while validating molbile number")
        return false
    }
}

async function validate_email(Email, id) {
    try {
        const regx = /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/
        if (regx.test(Email) === false) {
            return false
        }

        const user = await UserModel.find({Email:Email})
        
        switch (user.length) {
            case 0:
                return id

            case 1:
                if (user[0]._id == id) {
                    return id
                }
                return false
            
            default:
                return false
        }

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

async function verify_mobile_number(Mobilenumber) {
    const regx = /^[7-9][0-9]{9}$/

    if (!regx.test(Mobilenumber)) return "Please provide a valid mobile number"

    try {
        var user = await UserModel.findOne({ Mobilenumber })
    } catch (error) {
        return "Please provide a valid mobile number"
    }

    if (user) {
        return "User with the same mobile number is already exists"
    }

    return true
}

async function verify_email(Email) {
    const regx = /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/

    if (!regx.test(Email)) return "Please provide a valid email"

    try {
        var user = await UserModel.findOne({ Email })
    } catch (error) {
        return "Please provide a valid email"
    }
        
    if (user) {
        return "User with the same email is already present"
    }

    return true
}

module.exports = { verify_mobile_number, verify_email, validate_mobile_number, validate_email, validate_password }