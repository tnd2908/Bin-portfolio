const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    youtubeUrl: {
        type: String,
        required: true,
        unique: false,
    },
    category: {
        type: String,
        required: true,
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
const Project = mongoose.model("project", schema)
module.exports = Project;