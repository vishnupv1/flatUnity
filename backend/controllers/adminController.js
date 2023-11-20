const User = require('../models/userModel')
const Plan = require('../models/planModel')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const Post = require('../models/roomMateReqModel')
const roomPost = require('../models/roomReqModel')


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
const loadPlans = async (req, res) => {
    const plans = await Plan.find({})
    return res.status(200).json({ plans })
}
const deletePlan = async (req, res) => {

    try {
        const planId = req.query.id
        const deletedPlan = await Plan.findByIdAndDelete(planId);
        if (deletedPlan) {
            return res.status(200).json({ message: 'Plan deleted' })
        } else {
            return res.status(404).json({ message: 'Invalid request' })
        }
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}
const addPlan = async (req, res) => {
    try {
        const { planName, amount, duration } = req.body
        const features = req.body.features.split(',').map((feature) => feature.trim());

        const newPlan = new Plan({
            planName,
            amount,
            duration,
            features
        });
        const userData = await newPlan.save();
        return res.status(200).json({ message: 'Plan added' });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
const editPlan = async (req, res) => {
    try {
        const { planName, amount, duration } = req.body
        const features = req.body.features.split(',').map((feature) => feature.trim());
        const planId = req.query.id
        const upadted = await Plan.findByIdAndUpdate(planId, {
            $set: {
                planName: planName,
                amount: amount,
                duration: duration,
                features: features
            }
        })
        if (upadted) {
            return res.status(200).json({ message: 'Plan updated' });
        } else {
            return res.status(404).json({ message: 'Plan not found' });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
const unBlockOrBlockPost = async (req, res) => {
    try {
        const id = req.query.id;
        const post = await Post.findOne({ _id: id })
        console.log(post);
        if (post.isBlocked) {
            const postUnblock = await Post.updateOne({ _id: id }, { $set: { isBlocked: false } });
            return res.status(200).json({ message: 'Post unblocked' });
        }
        if (!post.isBlocked) {
            const postBlock = await Post.updateOne({ _id: id }, { $set: { isBlocked: true } });
            return res.status(200).json({ message: 'Post Blocked' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
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
    login,
    loadUsers,
    unBlockOrBlockUser,
    loadPlans,
    deletePlan,
    addPlan,
    editPlan,
    unBlockOrBlockPost,
    unBlockOrBlockRoomPost
}
