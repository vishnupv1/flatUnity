const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const userAuth = async (req, res, next) => {
    const header = req.headers['authorization']
    const headerArr = header.split(' ')
    const token = headerArr[1];
    const decoded = jwt.decode(token);
    if (decoded) {
        const userNum = decoded.userNum;
        const VerifiedUser = await Admin.findOne({ mobile: userNum })
        if (VerifiedUser) {
            next()
        } else {
            return res.status(404).json({ message: 'Un Authorised access' })
        }
    } else {
        console.log('Invalid JWT token');
    }

}


module.exports = userAuth