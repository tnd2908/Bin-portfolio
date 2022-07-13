const express = require('express')
const projectController = require('../Controller/ProjectController')
const projectRouter = express.Router()
projectRouter.get('/add', projectController.addProjectPage)
projectRouter.get('/:id', projectController.getDetail)
projectRouter.post('/add', projectController.addProject)
projectRouter.post('/add-stream', projectController.addStream)
module.exports = projectRouter