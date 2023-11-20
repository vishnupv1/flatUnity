const express = require('express');
const chatRoom_route = express();
const config = require('../config/config')
const userAuth = require('../middleware/auth')
const chatRoomController = require('../controllers/chatRoomController')


chatRoom_route.get('/loadChatmates', userAuth, chatRoomController.loadChatmates)



module.exports = chatRoom_route

