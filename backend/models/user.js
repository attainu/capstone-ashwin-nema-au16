const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true
    },

    Mobilenumber:{
        type:String,
        required:true
    },

    Password:{
        type:String,
        required:true
    },
    
    Location:{
        type:Array,
        default:[18.952163, 72.803736]
    }
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel