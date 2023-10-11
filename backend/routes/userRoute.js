const express = require('express');
const user_route = express();
const config = require('../config/config')
const bodyParser = require('body-parser')
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({ extended: true }))
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

const userController = require('../controllers/flatmateController')
user_route.use(express.static('public'));

user_route.post('/register', userController.register)
user_route.post('/sendOtp', userController.sendOtp)
user_route.post('/loginWithOtp', userController.loginWithOtp)
user_route.post('/verifyOtp', userController.verifyOtp)




module.exports = user_route

