const express = require('express');
const AuthController = require('../Controller/AuthController');
const adminRouter = express.Router();
adminRouter.get('/login', (req, res) => {
    res.render('login', {msg: ''})
})
adminRouter.post('/login', AuthController.login)
adminRouter.post('/register', AuthController.register)
module.exports = adminRouter;