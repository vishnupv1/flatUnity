const User = require('../models/userModel')
const Post = require('../models/roomMateReqModel')
const roomPost = require('../models/roomReqModel')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const config = require('../config/config')
const nodemailer = require('nodemailer')
const myEnv = require('dotenv').config()

const accountSid = process.env.SID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken')

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
//registering user
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
//sending otp to user mobile using random number module and twilio
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
//verifying otp
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
//sending OTP to user's mobile number
async function sendOtp(userMobile, otp) {
    // await client.messages
    //     .create({
    //         body: `your flatmate login otp is ${otp}`,
    //         to: `+91${userMobile}`, // Text your number
    //         from: '+17409001094', // From a valid Twilio number
    //     })
    //     .then((message) => console.log(message.sid));
    console.log('ffffffffff');
}
const roommateReqPost = async (req, res) => {
    try {
        const formData = req.body;
        const arrayimage = []
        for (let i = 0; i < req.files.length; i++) {
            arrayimage[i] = req.files[i].filename
        }
        const userNum = req.query.mobile;
        const user = await User.findOne({ mobile: userNum })
        const UserId = user._id
        if (user) {
            const amenities = []
            if (formData.ac === 'true') {
                amenities.push('ac');
            }
            if (formData.parking === 'true') {
                amenities.push('parking');
            }
            if (formData.wifi === 'true') {
                amenities.push('wifi');
            }
            if (formData.fridge === 'true') {
                amenities.push('fridge');
            }
            if (formData.washing === 'true') {
                amenities.push('washing');
            }
            if (formData.inverter === 'true') {
                amenities.push('inverter');
            }
            const post = new Post({
                userId: UserId,
                location: formData.location,
                gender: formData.gender,
                rent: formData.rent,
                contactNumber: formData.contact,
                amenities: amenities,
                description: formData.description,
                images: arrayimage,
                from: user.userType
            })
            const postData = await post.save();
            return res.status(200).json({ message: 'Requirement posted' });
        } else {
            return res.status(404).json({ message: 'Invalid user' });
        }
    }
    catch (err) {
        return res.status(404).json({ message: 'error' });
    }



}
const roomReqPost = async (req, res) => {
    try {
        const formData = req.body;
        const userNum = req.query.mobile;
        const user = await User.findOne({ mobile: userNum })
        if (user) {
            const UserId = user._id
            const post = new roomPost({
                userId: UserId,
                location: formData.location,
                gender: formData.gender,
                rent: formData.rent,
                contactNumber: formData.contact,
                date: formData.date,
                description: formData.description,
            })
            const postData = await post.save();
            return res.status(200).json({ message: 'Requirement posted' });
        } else {
            return res.status(404).json({ message: 'Invalid user' });
        }
    }
    catch (err) {
        return res.status(404).json({ message: 'error' });
    }



}
const loadposts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $addFields: {
                    ownerName: '$userDetails.name',
                    mobile: '$userDetails.mobile',
                },
            },
        ]);
        return res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json(error.message)
    }
}
const loadroomposts = async (req, res) => {
    try {
        const posts = await roomPost.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $addFields: {
                    ownerName: '$userDetails.name',
                    mobile: '$userDetails.mobile',
                    ownerGender: '$userDetails.gender',
                },
            },
        ]);
        return res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json(error.message)
    }
}
const verifyUser = async (req, res) => {
    try {
        const userMail = req.body.email
        const userData = await User.findOne({ email: userMail })
        if (userData) {
            await User.updateOne({ email: userMail }, { $set: { is_verified: true } });
        } else {
            res.status(404).json("invalid request")
        }
    }
    catch (error) {
        res.status(400).json("internal error")
    }

}
const loadProfile = async (req, res) => {
    try {
        const userNum = req.query.userNum
        const userData = await User.findOne({ mobile: userNum })
        if (userData) {
            return res.status(200).json({ userData });
        } else {
            res.status(404).json('invalid user')
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
            return res.status(200).json('User Updated');
        } else {
            res.status(404).json('invalid user')
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}
const deletePost = async (req, res) => {
    try {
        const postId = req.query.id
        const post = await Post.findOne({ _id: postId })
        if (post) {
            await Post.deleteOne({ _id: postId })
            res.status(200).json('Post deleted')
        } else {
            res.status(404).json('Post not found')
        }
    } catch (err) {
        res.status(404).json(err)
    }
}
const deleteRoomPost = async (req, res) => {
    try {
        const postId = req.query.id
        console.log(postId);
        const post = await roomPost.findOne({ _id: postId })
        if (post) {
            await roomPost.deleteOne({ _id: postId })
            res.status(200).json('Post deleted')
        } else {
            res.status(404).json('Post not found')
        }
    } catch (err) {
        res.status(404).json(err)
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
            res.status(400).json('user invalid')
        }
    } catch (error) {
        res.status(400).json(error.message)
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
module.exports = {
    register,
    sendOtp,
    loginWithOtp,
    verifyOtp,
    roommateReqPost,
    loadposts,
    verifyUser,
    roomReqPost,
    loadroomposts,
    loadProfile,
    updateProfile,
    deletePost,
    deleteRoomPost,
    loadOtpexpiry,
    resendOtp
}