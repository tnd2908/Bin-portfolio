const express = require('express');
const AuthController = require('../Controller/AuthController');
const checkAuth = require('../Middleware/checkAuth');
const LiveStream = require('../Model/LiveStream');
const Profile = require('../Model/Profile');
const Project = require('../Model/Project');
const adminRouter = express.Router();
adminRouter.get('/login', (req, res) => {
    res.render('login', {msg: ''})
})
adminRouter.get('/', checkAuth, async (req, res) => {
    try {
        const projects = await Project.find({}) || []
        res.render('admin', {projects})
    } catch (error) {
        console.log(error);
    }
})
adminRouter.get('/add', checkAuth, (req, res) => {
    res.render('add-project')
})
adminRouter.get('/livestream/add', checkAuth, (req, res) => {
    res.render('add-livestream')
})
adminRouter.get('/livestream', checkAuth, async (req, res) => {
    try {
        const projects = await LiveStream.find({}) || []
        res.render('live-stream', {projects})
    } catch (error) {
        console.log(error);
    }
})
adminRouter.get('/edit/:id', checkAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await Project.findById(id)
        if (detail) {
            res.render('edit-project', {detail})
        } else {
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error);
    }
})
adminRouter.get('/profile', checkAuth, async (req, res) => {
    try {
        const profile = await Profile.find({}).limit(1)
        res.render('edit-profile', {profile: profile[0]})
    } catch (error) {
        console.log(error);
    }
})
adminRouter.post('/login', AuthController.login)
adminRouter.post('/register', AuthController.register)
adminRouter.get('/reset', AuthController.resetPassword)
module.exports = adminRouter;