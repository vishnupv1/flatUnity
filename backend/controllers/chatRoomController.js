const User = require('../models/userModel')
const Chatroom = require('../models/chatRoom')


const loadChatmates = async (req, res) => {
    try {
        const userNum = req.query.userNum
        const user = await User.findOne({ mobile: userNum })
        const userId = user._id
        if (user) {
            const chatRoom = await Chatroom.find({
                $or: [
                    { senderId: userId },
                    { recieverId: userId }
                ]
            })
            if (chatRoom) {
                const chatroomToDisplay = await Chatroom.aggregate([
                    {
                        $lookup: {
                            from: 'users',
                            let: {
                                chatUserId: {
                                    $cond:
                                    {
                                        if: { $eq: ["$senderId", userId] }, then: "$recieverId", else: {
                                            $cond:
                                                { if: { $eq: ["$recieverId", userId] }, then: "$senderId", else:'' }
                                        }
                                    }
                                }
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$chatUserId"]
                                        }
                                    }
                                }
                            ],
                            as: 'userDetails',
                        },
                    },
                    {
                        $unwind: '$userDetails',
                    },
                    {
                        $addFields: {
                            userName: '$userDetails.name',
                            userId: '$userDetails._id',
                            mobile: '$userDetails.mobile',
                            userGender: '$userDetails.gender',
                            userIs_premium: '$userDetails.is_premium',
                            userType: '$userDetails.userType',
                        },
                    },
                ]);

                res.status(200).json({ chatroomToDisplay, userId })
            }
            else {
                res.status(400).json({ message: 'No chats' })
            }
        } else {
            res.status(404).json({ message: 'No User found' })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
module.exports = {
    loadChatmates
}