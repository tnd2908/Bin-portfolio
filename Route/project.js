const express = require('express')
const projectController = require('../Controller/ProjectController')
const Project = require('../Model/Project')
const projectRouter = express.Router()
projectRouter.get('/', projectController.getProjects)
projectRouter.get('/add', projectController.addProjectPage)
projectRouter.get('/detail/:id', projectController.getDetail)
projectRouter.get('/livestream', projectController.getLivestream)
projectRouter.get('/:category', projectController.getProjectByCategory)
projectRouter.post('/add', projectController.addProject)
projectRouter.post('/add-stream', projectController.addStream)
module.exports = projectRouter