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
                amenities.push('A/C');
            }
            if (formData.parking === 'true') {
                amenities.push('Parking');
            }
            if (formData.wifi === 'true') {
                amenities.push('Wi-Fi');
            }
            if (formData.fridge === 'true') {
                amenities.push('Fridge');
            }
            if (formData.washing === 'true') {
                amenities.push('Washing Mechine');
            }
            if (formData.inverter === 'true') {
                amenities.push('Inverter');
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
                    ownerGender: '$userDetails.gender',
                    ownerIs_premium: '$userDetails.is_premium',
                    ownerType: '$userDetails.userType',
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
            res.status(404).json({ message: "invalid request" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "internal error" })
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
const deletePost = async (req, res) => {
    try {
        const postId = req.query.id
        const post = await Post.findOne({ _id: postId })
        if (post) {
            await Post.deleteOne({ _id: postId })
            res.status(200).json({ message: 'Post deleted' })
        } else {
            res.status(404).json({ message: 'Post not found' })
        }
    } catch (err) {
        res.status(404).json({ message: err.mesasge })
    }
}
const deleteRoomPost = async (req, res) => {
    try {
        const postId = req.query.id
        const post = await roomPost.findOne({ _id: postId })
        if (post) {
            await roomPost.deleteOne({ _id: postId })
            res.status(200).json({ message: 'Post deleted' })
        } else {
            res.status(404).json({ message: 'Post not found' })
        }
    } catch (err) {
        res.status(404).json({ mesasge: err.mesasge })
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
const updateRoomPost = async (req, res) => {
    try {
        const postId = req.query.postId
        const { location, gender, rent, mobile, date, description } = req.body
        const postData = await roomPost.findOne({ _id: postId })
        if (postData) {
            await roomPost.updateOne({ _id: postId }, {
                $set: {
                    location: location,
                    gender: gender,
                    rent: rent,
                    mobile: mobile,
                    date: date,
                    description: description
                }
            })
            return res.status(200).json({ message: 'Requirement Updated' });
        } else {
            res.status(404).json({ message: 'invalid request' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const roomMatepostUpdate = async (req, res) => {
    try {
        const postId = req.query.postId
        const formData = req.body

        const arrayimage = []
        for (let i = 0; i < req.files.length; i++) {
            arrayimage[i] = req.files[i].filename
        }

        const amenities = []
        if (formData.ac === 'true') {
            amenities.push('A/C');
        }
        if (formData.parking === 'true') {
            amenities.push('Parking');
        }
        if (formData.wifi === 'true') {
            amenities.push('Wi-Fi');
        }
        if (formData.fridge === 'true') {
            amenities.push('Fridge');
        }
        if (formData.washing === 'true') {
            amenities.push('Washing Mechine');
        }
        if (formData.inverter === 'true') {
            amenities.push('Inverter');
        }

        const data = await Post.findById({ _id: postId })
        const imagesFromServer = data.images

        try {
            if (req.files.length > 0) {
                const upadted = await Post.findByIdAndUpdate(postId, {
                    $set: {
                        location: formData.location,
                        gender: formData.gender,
                        rent: formData.rent,
                        contactNumber: formData.contact,
                        amenities: amenities,
                        description: formData.description,
                        images: arrayimage
                    }
                })
                return res.status(200).json({ message: 'Requirement Updated' });
            }
            else {
                const upadted = await Post.findByIdAndUpdate(postId, {
                    $set: {
                        location: formData.location,
                        gender: formData.gender,
                        rent: formData.rent,
                        contactNumber: formData.contact,
                        amenities: amenities,
                        description: formData.description,
                        images: imagesFromServer
                    }
                })
            }
            return res.status(200).json({ message: 'Requirement Updated' });
        } catch {
            res.status(404).json({ message: 'Invalid Request' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err.message);
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
const sendMessage = async (req, res) => {
    try {
        const { senderId, recieverId, messageContent } = req.body
        const existingChatRoom = await chatRoom.findOne({
            $or: [
                { senderId, recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        })
        if (existingChatRoom) {
            const chatRoomId = existingChatRoom._id
            const newMessage = new Chat({
                content: messageContent,
                date: new Date(),
                chatRoomId: chatRoomId,
                senderId: senderId
            })
            const chatData = await newMessage.save();
            return req.status(200).json({ message: 'Message sent' })
        } else {
            try {
                // Create the chat room
                const newChatRoom = await chatRoom.create({ senderId, recieverId });

                // Extract the chat room ID
                const chatRoomId = newChatRoom._id;

                // Create and save the new message
                const newMessage = new Chat({
                    content: messageContent,
                    date: new Date(),
                    chatRoomId: chatRoomId,
                    senderId: senderId
                });

                const chatData = await newMessage.save();

                return res.status(200).json({ message: 'Message sent' });
            } catch (error) {
                // Handle any errors that occur during chat room creation or message sending
                console.error('Error creating chat room and sending message:', error);
                return res.status(500).json({ error: 'An error occurred' });
            }
        }
    }
    catch (err) {
        res.status(404).json({ message: 'Error occured' })
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
    resendOtp,
    updateRoomPost,
    roomMatepostUpdate,
    subscribePremium,
    paymentUpdate,
    sendMessage
}