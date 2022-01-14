const express = require('express')
const projectController = require('../Controller/ProjectController')
const viralRouter = express.Router()
viralRouter.get('/:category', projectController.getListViral)

module.exports = viralRouter