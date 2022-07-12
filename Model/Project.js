const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    youtubeUrl: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    thumb: {
        type: String,
        required: false
    },
    createAt:{
        type: Date,
        default: new Date()
    }
})
const Project = mongoose.model("project", schema)
module.exports = Project;