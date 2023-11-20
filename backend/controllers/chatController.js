
const Chatroom = require('../models/chatRoom')
const Chat = require('../models/chatModel')
const myEnv = require('dotenv').config()
const { async } = require('rxjs')
const chatRoom = require('../models/chatRoom')

const sendMessage = async (req, res) => {
    try {
        const { senderId, recieverId, content } = req.body
        const existingChatRoom = await chatRoom.findOne({
            $or: [
                { senderId, recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        })
        if (existingChatRoom) {
            const chatRoomId = existingChatRoom._id
            const newMessage = new Chat({
                content: content,
                date: new Date(),
                chatRoomId: chatRoomId,
                senderId: senderId
            })
            const chatData = await newMessage.save();
            return res.status(200).json({ message: 'Message sent' })
        } else {
            try {
                // Create the chat room
                const newChatRoom = await chatRoom.create({ senderId, recieverId });

                // Extract the chat room ID
                const chatRoomId = newChatRoom._id;

                // Create and save the new message
                const newMessage = new Chat({
                    content: content,
                    date: new Date(),
                    chatRoomId: chatRoomId,
                    senderId: senderId
                });

                const chatData = await newMessage.save();

                return res.status(200).json({ message: 'Message sent' });
            } catch (error) {
                console.error('Error creating chat room and sending message:', error);
                return res.status(500).json({ error: 'An error occurred' });
            }
        }
    }
    catch (err) {
        res.status(404).json({ message: 'Error occured' })
    }
}
const loadChats = async (req, res) => {
    try {
        const senderId = req.query.sender
        const recieverId = req.query.reciever
        const chatRoom = await Chatroom.findOne({
            $or: [
                { senderId, recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        })
        if (chatRoom) {
            const chats = await Chat.find({ chatRoomId: chatRoom._id })
            res.status(200).json({ chats })

        } else {
            res.status(400).json({ message: 'No chats' })
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })

    }

}

module.exports = {
    sendMessage,
    loadChats,
}