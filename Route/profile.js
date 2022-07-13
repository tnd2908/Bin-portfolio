const express = require('express');
const Profile = require('../Model/Profile');
const profileRouter = express.Router();
profileRouter.post('/', async (req, res) => {
    try {
        const profiles = await Profile.find({})
        const id = profiles[0]._id
        const { email, phone, zalo, facebook, description } = req.body
        await Profile.findByIdAndUpdate(id, {
            email,
            phone,
            zalo,
            facebook,
            description
        })
        res.redirect('/admin')
    } catch (error) {
        console.log(error);
        res.json({
            msg: error
        })
    }
})
profileRouter.get('/', (req, res) => {
    res.render('add-project')
})
module.exports = profileRouter