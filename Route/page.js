const express = require('express')
const pageRouter = express.Router()
pageRouter.get('/', async (req, res) =>{
    res.render('./home')
})

module.exports = pageRouter