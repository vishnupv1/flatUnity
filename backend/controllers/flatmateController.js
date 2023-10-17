const User = require('../models/userModel')
const Post = require('../models/roomMateReqModel')
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
        const email = req.body.email
        const mobile = req.body.mobile
        const exist = await User.findOne({ mobile: mobile });
        const mailexist = await User.findOne({ email: email });
        if (mailexist) {
            return res.status(409).json({ message: 'Email id already registered' });
        }
        else if (exist) {
            return res.status(409).json({ message: 'Mobile already registered' });
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
            return res.status(201).json({ message: 'Registration successful' });
        }
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
            if (!user.is_blocked) {
                userMobile = user.mobile
            }
            else {
                return res.status(404).json({ message: 'User Blocked' });
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
            await User.updateOne({ mobile: req.body.mobile }, { $set: { otp: OTP } })
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
        if (userData.otp == OTP) {
            const options = {
                expiresIn: '1h'
            };
            const token = jwt.sign(req.body, 'mysecretkey', options);
            return res.status(200).json({ message: 'otp validation successfull', userToken: token, mobile: userData.mobile });

        }
        else {
            return res.status(404).json({ message: 'otp invalid' });
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
const roommateReqPost = async (req, res) => {
    try {
        console.log('ddddddddd');
        const formData = req.body;
        console.log(formData);
        const images = req.file.filename
        const userNum = req.query.mobile;
        user = await User.findOne({ mobile: userNum })
        UserId = user._id

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
            images: images
        })
        const postData = await post.save();
        return res.status(200).json({ message: 'Requirement posted' });
    }
    catch (err) {
        return res.status(404).json({ message: 'error' });
    }



}
const loadposts = async (req, res) => {
    const posts = await Post.find({})




    const username = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $project: {
                _id: 0, // Exclude _id field
                name: "$user.name",
            },
        },
    ]);
    // const posts = {
    //     name: username,
    //     gender: postData.gender,
    //     images: postData.images,
    //     location: postData.location
    // }

    return res.status(200).json({ posts: posts })
}

module.exports = {
    register,
    sendOtp,
    loginWithOtp,
    verifyOtp,
    roommateReqPost,
    loadposts
}