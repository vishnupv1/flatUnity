const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const config = require('../config/config')
const nodemailer = require('nodemailer')
const accountSid = 'AC907f228b5ab0107739ba05f73674f14e';
const authToken = 'ee335f2d885b3ade2f6ad07f6d1d52e3';
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken')

//registering user
const register = async (req, res) => {
    try {
        const exist = await User.findOne({ mobile: req.body.mobile });
        const mailexist = await User.findOne({ email: req.body.email });
        if (mailexist) {
            res.status(409).json({ message: 'Email id already registered' });
        }
        else if (exist) {
            res.status(409).json({ message: 'Mobile already registered' });
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
            res.status(201).json({ message: 'Registration successful' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//sending otp to user mobile using random number module and twilio
const loginWithOtp = async (req, res) => {
    try {
        const user = await User.findOne({ mobile: req.body.mobile })
        userMobile = user.mobile
        if (userMobile) {
            let OTP = ""
            let digits = '0123456789'
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)]
            }
            await User.updateOne({ mobile: req.body.mobile }, { $set: { otp: OTP } })
            sendOtp(userMobile, OTP)
            res.status(200).json({ message: 'otp sent successfully' });
        }
        else {
            res.status(404).json({ message: 'Mobile number not registered' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
//verifying otp
const verifyOtp = async (req, res) => {
    try {
        let body = req.body
        const otpString = Object.values(body).join('');
        const OTP = Number(otpString)
        const mobile = req.body.mobile
        let userData = await User.findOne({ mobile: mobile })
        if (userData) {
            const options = {
                expiresIn: '1h'
            };
            const token = jwt.sign(req.body, 'mysecretkey', options);
            res.status(200).json({ message: 'otp validation successfull', userToken: token, mobile: userData.mobile });

        }
        else {
            res.status(404).json({ message: 'otp invalid' });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
//sending OTP to user's mobile number
async function sendOtp(userMobile, otp) {
    await client.messages
        .create({
            body: `your flatmate login otp is ${otp}`,
            to: `+91${userMobile}`, // Text your number
            from: '+17409001094', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}

module.exports = {
    register,
    sendOtp,
    loginWithOtp,
    verifyOtp
}