const express = require('express')
const Project = require('../Model/Project')
const pageRouter = express.Router()
pageRouter.get('/', async (req, res) =>{
    try {
        const projects = await Project.find({}) || []
        res.render('home', {projects})
    } catch (error) {
        console.log(error);
    }
})

module.exports = pageRouter