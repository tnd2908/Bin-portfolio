const express = require('express')
const Profile = require('../Model/Profile')
const Project = require('../Model/Project')
const pageRouter = express.Router()
pageRouter.get('/', async (req, res) =>{
    try {
        const projects = await Project.find({}) || []
        const profile = await Profile.find({})
        res.render('home', {projects, profile: profile[0]})
    } catch (error) {
        console.log(error);
    }
})

module.exports = pageRouter