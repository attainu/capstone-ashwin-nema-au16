const mongoose = require('mongoose')
const TokenSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    expire_at: { type: Date, expires: 108300, default: Date.now }
})

const TokenModel = mongoose.model('Token', TokenSchema)
module.exports = TokenModel