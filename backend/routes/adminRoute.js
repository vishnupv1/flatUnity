const express = require('express');
const admin_route = express();
const adminController = require('../controllers/adminController')
admin_route.use(express.static('public'));


admin_route.post('/login', adminController.login)


module.exports = admin_route
