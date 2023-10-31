const mongoose = require('mongoose')
const roomMatereqSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    rent: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    amenities: {
        type: Array,
    },
    description: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
            },
            timeStamp: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    images: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("roomMatereq", roomMatereqSchema)