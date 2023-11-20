const User = require('../models/userModel')
const roomPost = require('../models/roomReqModel')
const config = require('../config/config')
const myEnv = require('dotenv').config()
const { async } = require('rxjs')


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
                    ownerType: '$userDetails.userType',
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
const unBlockOrBlockRoomPost = async (req, res) => {
    try {
        const id = req.query.id;
        const post = await roomPost.findOne({ _id: id })

        if (post.isBlocked) {
            const postUnblock = await roomPost.updateOne({ _id: id }, { $set: { isBlocked: false } });
            return res.status(200).json({ message: 'Post unblocked' });
        }
        if (!post.isBlocked) {
            const postBlock = await roomPost.updateOne({ _id: id }, { $set: { isBlocked: true } });
            return res.status(200).json({ message: 'Post Blocked' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    roomReqPost,
    loadroomposts,
    deleteRoomPost,
    updateRoomPost,
    unBlockOrBlockRoomPost
}