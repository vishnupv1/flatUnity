const User = require('../models/userModel')
const Post = require('../models/roomMateReqModel')
const roomPost = require('../models/roomReqModel')
const Plan = require('../models/planModel')
const Chatroom = require('../models/chatRoom')
const Chat = require('../models/chatModel')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const config = require('../config/config')
const nodemailer = require('nodemailer')
const myEnv = require('dotenv').config()

const accountSid = process.env.SID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken')
const { async } = require('rxjs')
const razorpay = require('razorpay')
const chatRoom = require('../models/chatRoom')

const razorID_Key = process.env.RAZOR_ID
const razorSEC_Key = process.env.RAZOR_SECRET

const razorInstance = new razorpay({
    key_id: razorID_Key,
    key_secret: razorSEC_Key
})
const sendVerifyMail = async (username, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.passwordUser
            }
        })
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'FlatUnity User verification',
            html: '<p>Hi ' + username + ' , Plese click here to verify your flatUnity account <a href = "http://localhost:4200/verify?id=' + email + '">Verify</a></p>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('email has been sent:-', info.response);
            }
        })
    }
    catch (error) {
        console.log(error.message);
    }
}
const register = async (req, res) => {
    try {
        const { name, email, mobile, gender, userType, city } = req.body;
        const emailExists = await User.findOne({ email });
        const mobileExists = await User.findOne({ mobile });

        if (emailExists) {
            return res.status(409).json({ message: 'Email ID already registered' });
        } else if (mobileExists) {
            return res.status(409).json({ message: 'Mobile already registered' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            mobile,
            gender,
            userType,
            city
        });

        // Save the user to the database
        const userData = await newUser.save();
        sendVerifyMail(name, email)

        return res.status(201).json({ message: 'Registration successful verification mail sent to mail Id , please verify' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const loginWithOtp = async (req, res) => {
    try {
        const user = await User.findOne({ mobile: req.body.mobile })
        if (user) {
            if (user.is_verified) {
                if (!user.is_blocked) {
                    userMobile = user.mobile
                }
                else {
                    return res.status(404).json({ message: 'User Blocked' });
                }
            } else {
                return res.status(404).json({ message: 'User Verification pending please verify through mail' });
            }

        } else {
            return res.status(404).json({ message: 'Mobile number not registered' });
        }
        if (userMobile) {
            let OTP = ""
            let digits = '0123456789'
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)]
            }
            function generateExpirationTime() {
                const currentTime = new Date();
                const expirationTime = new Date(currentTime.getTime() + 65000);
                return expirationTime;
            }
            await User.updateOne({ mobile: req.body.mobile }, { $set: { otp: OTP, otpExpires: generateExpirationTime() } })
            sendOtp(userMobile, OTP)
            return res.status(200).json({ message: 'otp sent successfully' });
        }
        else {
            return res.status(404).json({ message: 'Mobile number not registered' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }
}
const verifyOtp = async (req, res) => {
    try {
        let otpData = req.body
        const otpString = otpData.otp1 + otpData.otp2 + otpData.otp3 + otpData.otp4 + otpData.otp5 + otpData.otp6;
        const OTP = Number(otpString)
        const mobile = req.body.mobile
        let userData = await User.findOne({ mobile: mobile })
        if (userData) {
            function hasOTPOrExpired() {
                const currentTime = new Date();
                const expirationTime = userData.otpExpires
                return currentTime >= expirationTime;
            }

            const UserId = { userId: userData._id }
            if (hasOTPOrExpired()) {
                return res.status(400).json({ message: 'OTP Expired' });
            }
            else if (userData.otp == OTP) {
                const options = {
                    expiresIn: '1h'
                };
                const token = jwt.sign(UserId, 'mysecretkey', options);
                const userNum = userData.mobile
                return res.status(200).json({ message: 'otp validation successfull', userToken: token, mobile: userNum });

            }
            else {
                return res.status(404).json({ message: 'otp invalid' });
            }
        } else {
            return res.status(404).json({ message: 'Invalid User' });
        }

    }
    catch (error) {
        console.log(error.message);
    }
}
async function sendOtp(userMobile, otp) {
    await client.messages
        .create({
            body: `your flatmate login otp is ${otp}`,
            to: `+91${userMobile}`, // Text your number
            from: '+17409001094', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}
const verifyUser = async (req, res) => {
    try {
        const userMail = req.body.email
        const userData = await User.findOne({ email: userMail })
        if (userData) {
            await User.updateOne({ email: userMail }, { $set: { is_verified: true } });
        } else {
            res.status(404).json({ message: "invalid request" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "internal error" })
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
const loadProfile = async (req, res) => {
    try {
        const userNum = req.query.userNum
        const userData = await User.findOne({ mobile: userNum })
        if (userData) {
            return res.status(200).json({ userData });
        } else {
            res.status(404).json({ message: 'invalid user' })
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}
const updateProfile = async (req, res) => {
    try {
        const userNum = req.query.userNum
        const { name, email, mobile } = req.body
        const userData = await User.findOne({ mobile: userNum })
        if (userData) {
            await User.updateOne({ _id: userData._id }, {
                $set: {
                    name: name,
                    email: email,
                    mobile: mobile
                }
            })
            return res.status(200).json({ message: 'User Updated' });
        } else {
            res.status(404).json({ message: 'invalid request' })
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}
const loadOtpexpiry = async (req, res) => {
    try {
        const userNum = req.query.userNum
        const user = await User.findOne({ mobile: userNum })
        if (user) {
            const otpExpires = await user.otpExpires
            res.status(200).json(otpExpires)
        } else {
            res.status(400).json({ message: 'user invalid' })
        }
    } catch (error) {
        res.status(400).json({ mesasge: error.message })
    }
}
const resendOtp = async (req, res) => {
    try {
        const user = await User.findOne({ mobile: req.body.mobile })
        if (user) {
            if (user.is_verified) {
                if (!user.is_blocked) {
                    userMobile = user.mobile
                }
                else {
                    return res.status(404).json({ message: 'User Blocked' });
                }
            } else {
                return res.status(404).json({ message: 'User Verification pending please verify' });
            }

        } else {
            return res.status(404).json({ message: 'Mobile number not registered' });
        }
        if (userMobile) {
            let OTP = ""
            let digits = '0123456789'
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)]
            }
            function generateExpirationTime() {
                const currentTime = new Date();
                const expirationTime = new Date(currentTime.getTime() + 65000);
                return expirationTime;
            }
            await User.updateOne({ mobile: req.body.mobile }, { $set: { otp: OTP, otpExpires: generateExpirationTime() } })
            sendOtp(userMobile, OTP)
            return res.status(200).json({ message: 'otp sent successfully' });
        }
        else {
            return res.status(404).json({ message: 'Mobile number not registered' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }
}
const subscribePremium = async (req, res) => {
    try {
        const amount = req.body.amount * 100
        const userMobile = req.body.mobile
        const duration = req.body.duration
        const planName = req.body.planName
        const userData = await User.findOne({ mobile: userMobile })
        if (userData) {
            const options = {
                amount: amount,
                currency: 'INR',
                receipt: 'razorUser@gmail.com'
            }

            razorInstance.orders.create(options,
                (err, order) => {
                    if (!err) {
                        res.status(200).send({
                            success: true,
                            msg: 'Subscribed',
                            order_id: order.id,
                            amount: amount,
                            duration: duration,
                            planName: planName,
                            key_id: razorID_Key,
                            plan: req.body.name,
                            name: userData.name,
                            email: userData.email,
                            mobile: userData.mobile,
                        });
                    }
                    else {
                        res.status(400).send({ success: false, msg: err });
                    }
                }
            );
        } else {
            res.status(400).send({ success: false, msg: 'Something went wrong!' });

        }

    } catch (error) {
        console.log(error.message);
    }
}
const paymentUpdate = async (req, res) => {
    try {
        const { mobile, duration, planName } = req.body
        const month = Number(duration)
        const currentDate = new Date();

        const subscriptionEnds = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + month,
            currentDate.getDate(),
            0, 0, 0, 0
        );
        const user = await User.findOne({ mobile: mobile })
        const updated = await User.findByIdAndUpdate(user._id, {
            $set: {
                is_premium: true,
                subscriptionStarts: new Date(),
                subscriptionEnds: subscriptionEnds,
                planName: planName
            }
        })
        if (updated) {
            return res.status(200).json({ message: 'Premium activated' })
        }
        else {
            return res.status(200).json({ message: 'Activation error' })
        }
    } catch (err) {
        return res.status(400).json({ message: 'Error occured' })
    }
}

module.exports = {
    register,
    sendOtp,
    loginWithOtp,
    verifyOtp,
    verifyUser,
    loadProfile,
    updateProfile,
    loadOtpexpiry,
    resendOtp,
    subscribePremium,
    paymentUpdate,
    loadUsers,
    unBlockOrBlockUser
}