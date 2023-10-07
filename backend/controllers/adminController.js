const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')



//verifying otp
const login = async (req, res) => {
    try {
        let body = req.body
        const username = body.username
        const password = body.password
        let adminData = await Admin.findOne({ username: username })
        if (adminData) {
            if (password == adminData.password) {
                const options = {
                    expiresIn: '1h'
                };
                const token = jwt.sign(req.body, 'mysecretkey', options);
                res.status(200).json({ message: 'Login successfull', adminToken: token, adminName: adminData.username });

            }
            else {
                res.status(404).json({ message: 'Password not match' });
            }
        }

        else {
            res.status(404).json({ message: 'Invalid user' });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    login
}