const User = require('../models/userModel')
const Post = require('../models/roomMateReqModel')

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
const unBlockOrBlockPost = async (req, res) => {
    try {
        const id = req.query.id;
        const post = await Post.findOne({ _id: id })
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

module.exports = {
    roommateReqPost,
    loadposts,
    deletePost,
    roomMatepostUpdate,
    unBlockOrBlockPost
}