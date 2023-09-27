const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ''
    },
    otp: {
        type: String,
        default: ''
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    is_premium: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('User', userSchema)
