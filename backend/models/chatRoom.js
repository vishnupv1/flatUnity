const mongoose = require('mongoose')
const chatRoomSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }

})

module.exports = mongoose.model('chatRoom', chatRoomSchema)