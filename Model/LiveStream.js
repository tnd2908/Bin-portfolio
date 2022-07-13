const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    facebookUrl: {
        type: String,
        unique: true,
        required: true
    },
    thumb: {
        type: String,
        required: false
    },
    createAt:{
        type: Date,
        default: new Date()
    },
    imageId: {
        type: String,
        required: true
    }
})
const LiveStream = mongoose.model('livestream', schema);
module.exports = LiveStream;