const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const User = require('../models/userModel')

const userAuth = async (req, res, next) => {
    const header = req.headers['authorization']
    const headerArr = header.split(' ')
    const token = headerArr[1];
    const decoded = jwt.decode(token);
    if (decoded) {
        const userId = decoded.userId;
        const VerifiedUser = await User.findOne({ _id: userId })
        const VerifiedAdmin = await Admin.findOne({ _id: userId })
        if (VerifiedUser || VerifiedAdmin) {
            next()
        } else {
            return res.status(404).json({ message: 'Un Authorised access' })
        }
    } else {
        return res.status(404).json({ message: 'Invalid JWT token' });
    }

}


module.exports = userAuth