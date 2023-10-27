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
const loadUsers = async (req, res) => {
    const users = await User.find({})
    return res.status(200).json({ users: users })
}
const unBlockOrBlockUser = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await User.findOne({ _id: id })
        if (user.is_blocked) {
            const userUnBlock = await User.updateOne({ _id: id }, { $set: { is_blocked: false } });
            return res.status(200).json({ message: 'User unblocked' });
        }
        if (!user.is_blocked) {
            const userBlock = await User.updateOne({ _id: id }, { $set: { is_blocked: true } });
            return res.status(200).json({ message: 'User Blocked' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    login,
    loadUsers,
    unBlockOrBlockUser,
}