const express = require('express')
const projectController = require('../Controller/ProjectController')
const projectRouter = express.Router()
projectRouter.get('/add', projectController.addProjectPage)
projectRouter.get('/:category', projectController.getListViral)
projectRouter.post('/add', projectController.addProject)
module.exports = projectRouter