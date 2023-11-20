const chatController = require('../controllers/chatController')
const express = require('express');
const chat_route = express();
const userAuth = require('../middleware/auth')

chat_route.use(express.static('public'));

chat_route.post('/sendMessage', chatController.sendMessage)
chat_route.get('/loadChats', userAuth, chatController.loadChats)


module.exports = chat_route