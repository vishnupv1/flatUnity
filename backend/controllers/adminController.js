const User = require('../models/userModel')
const Plan = require('../models/planModel')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const Post = require('../models/roomMateReqModel')
const roomPost = require('../models/roomReqModel')


const login = async (req, res) => {
    try {
        let body = req.body
        const username = body.username
        const password = body.password
        let adminData = await Admin.findOne({ username: username })
        const adminId = { userId: adminData._id }
        if (adminData) {
            if (password == adminData.password) {
                const options = {
                    expiresIn: '1h'
                };
                const token = jwt.sign(adminId, 'mysecretkey', options);
                return res.status(200).json({ message: 'Login successfull', adminToken: token, adminName: adminData.username });

            }
            else {
                return res.status(404).json({ message: 'Password not match' });
            }
        }

        else {
            return res.status(404).json({ message: 'Invalid user' });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    login,
}
