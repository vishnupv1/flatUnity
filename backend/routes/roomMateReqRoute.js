const express = require('express');
const roomMateReq_route = express();
const config = require('../config/config')
const bodyParser = require('body-parser')
roomMateReq_route.use(bodyParser.json())
roomMateReq_route.use(bodyParser.urlencoded({ extended: true }))
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
const roomMateReqController = require('../controllers/roomMateReqController')
roomMateReq_route.use(express.static('public'));



roomMateReq_route.post('/roommateReqPost', userAuth, upload.array('image'), roomMateReqController.roommateReqPost)
roomMateReq_route.get('/loadposts', userAuth, roomMateReqController.loadposts)
roomMateReq_route.delete('/deletePost', userAuth, roomMateReqController.deletePost)
roomMateReq_route.patch('/roomMatepostUpdate', userAuth, upload.array('image'), roomMateReqController.roomMatepostUpdate)
roomMateReq_route.patch('/unBlockOrBlockPost', userAuth, roomMateReqController.unBlockOrBlockPost)

module.exports = roomMateReq_route
