const express = require('express');
const AuthController = require('../Controller/AuthController');
const Project = require('../Model/Project');
const adminRouter = express.Router();
adminRouter.get('/login', (req, res) => {
    res.render('login', {msg: ''})
})
adminRouter.get('/', async (req, res) => {
    try {
        const projects = await Project.find({}) || []
        res.render('admin', {projects})
    } catch (error) {
        
    }
})
adminRouter.get('/add', (req, res) => {
    res.render('add-project')
})
adminRouter.post('/login', AuthController.login)
adminRouter.post('/register', AuthController.register)
module.exports = adminRouter;