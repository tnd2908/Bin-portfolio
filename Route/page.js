const express = require('express')
const PageController = require('../Controller/pageController')
const pageRouter = express.Router()
pageRouter.get('/', PageController.homePage)

module.exports = pageRouter