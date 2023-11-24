const User = require('../models/userModel')
const Plan = require('../models/planModel')
const myEnv = require('dotenv').config()

const accountSid = process.env.SID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken')
const razorpay = require('razorpay')
const chatRoom = require('../models/chatRoom')

const razorID_Key = process.env.RAZOR_ID
const razorSEC_Key = process.env.RAZOR_SECRET

const razorInstance = new razorpay({
    key_id: razorID_Key,
    key_secret: razorSEC_Key
})

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


module.exports = {
    subscribePremium,
    paymentUpdate,
    loadPlans,
    deletePlan,
    addPlan,
    editPlan,
}