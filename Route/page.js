const express = require('express')
const pageRouter = express.Router()
const url = require('../url')
pageRouter.get('/', async (req, res) =>{
    const data = {
        url
    }
    res.render('home', data)
})

module.exports = pageRouter