const mongoose = require('mongoose')
const chatSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Chat', chatSchema)