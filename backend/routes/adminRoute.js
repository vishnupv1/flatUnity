const express = require('express');
const admin_route = express();
const config = require('../config/config')
const bodyParser = require('body-parser')
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({ extended: true }))
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth')

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

const adminController = require('../controllers/adminController')
admin_route.use(express.static('public'));

admin_route.post('/login', adminController.login)
admin_route.get('/loadUsers', auth, adminController.loadUsers)
admin_route.patch('/unBlocOrBlockkUser', auth, adminController.unBlockOrBlockUser)


module.exports = admin_route
