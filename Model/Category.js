const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
})
const Category = mongoose.model("category", schema)
module.exports = Category;