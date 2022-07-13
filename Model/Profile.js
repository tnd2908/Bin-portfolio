const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    zalo: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
})
const Profile = mongoose.model('profile', schema)
module.exports = Profile;