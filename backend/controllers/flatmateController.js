const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const config = require('../config/config')
const nodemailer = require('nodemailer')
const accountSid = 'AC907f228b5ab0107739ba05f73674f14e';
const authToken = 'cda4bb2c379d8176d16431393071cbc6';
const client = require('twilio')(accountSid, authToken);

const register = async (req, res) => {
    try {
        const exist = await User.findOne({ mobile: req.body.mobile });
        if (exist) {
            res.status(400).json({ message: 'User already exists' });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                gender: req.body.gender,
                userType: req.body.userType,
                city: req.body.city
            });
            const userData = await user.save();

            if (userData) {
                res.status(201).json({ message: 'Registration successful' });
            } else {
                res.status(500).json({ message: 'Registration failed' });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// const otpSend = async (req, res) => {
//     try {
//         const userMail = await User.findOne({ mail: req.body.email })
//         if (userMail) {
//             let OTP = ""
//             let digits = '0123456789'
//             for (let i = 0; i < 6; i++) {
//                 OTP += digits[Math.floor(Math.random() * 10)]
//             }
//             const updatedUser = await User.updateOne({ mail: req.body.email }, { $set: { otp: OTP } })
//             otpVerifyMail(userMail.username, userMail.mail, OTP)
//             res.render('otp')
//         }
//         else {
//             res.render('otpsend', { message: 'invalid mail id' })
//         }
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }
// //verifying otp
// const verifyotp = async (req, res) => {
//     try {
//         let OTP = req.body.otp
//         let userData = await User.findOne({ otp: OTP })
//         if (userData) {
//             req.session.user_id = userData._id
//             res.redirect('/home')
//         }
//         else {
//             res.render('otp', { message: 'invalid otp' })
//         }
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }
//adding user using signup
const sendOtp = async (req, res) => {
    client.messages
      .create({
        body: 'Hello from twilio-node',
        to: '+917510208562', // Text your number
        from: '+17409001094', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
}





module.exports = {
    register,
    sendOtp
}