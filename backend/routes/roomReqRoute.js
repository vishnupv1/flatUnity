const express = require('express');
const roomReq_route = express();
const config = require('../config/config')
const bodyParser = require('body-parser')
roomReq_route.use(bodyParser.json())
roomReq_route.use(bodyParser.urlencoded({ extended: true }))
const multer = require('multer')
const path = require('path')
const userAuth = require('../middleware/auth')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('./public/userImages'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})
const upload = multer({ storage: storage })

const roomReqController = require('../controllers/roomReqController')

roomReq_route.use(express.static('public'));

roomReq_route.post('/roomReqPost', userAuth, roomReqController.roomReqPost)
roomReq_route.get('/loadroomposts', userAuth, roomReqController.loadroomposts)
roomReq_route.delete('/deleteRoomPost', userAuth, roomReqController.deleteRoomPost)
roomReq_route.patch('/updateRoomPost', userAuth, roomReqController.updateRoomPost)
roomReq_route.patch('/unBlockOrBlockRoomPost', userAuth, roomReqController.unBlockOrBlockRoomPost)

module.exports = roomReq_route