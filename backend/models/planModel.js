const mongoose = require('mongoose')
const planSchema = mongoose.Schema({
    planName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    features: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Plan', planSchema)