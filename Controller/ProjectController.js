const LiveStream = require("../Model/LiveStream");
const Project = require("../Model/Project");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

class ProjectController {
    static getDetail = async (req, res) =>{
        try {
            const {id} = req.params;
            const detail = await Project.findById(id)
            if (detail) {
                const { category, name } = detail
                res.render('detail', {detail: {
                    name,
                    category,
                    youtubeUrl: detail.youtubeUrl.replace('watch?v=', 'embed/')
                }})
            } else {
                res.redirect('/')
            }
        } catch (error) {
            
        }
    }
    static addProjectPage = (req, res) => {
        res.render('add-project')
    }
    static getProjects = async (req, res) => {
        try {
            const { page } = req.query || 1
            const projects = await Project.find({}).skip(page * 12).limit(12) || []
            res.render('project-list', {projects})
        } catch (error) {
            console.log(error);
        }
    }
    static getLivestream = async (req, res) => {
        try {
            const { page } = req.query || 1
            const projects = await LiveStream.find({}).skip(page * 12).limit(12) || []
            res.render('live-stream-list', {projects})
        } catch (error) {
            console.log(error);
        }
    }
    static getProjectByCategory = async (req, res) => {
        try {
            const { page } = req.query || 1
            const { category } = req.params
            const projects = await Project.find({category}).skip(page * 12).limit(12) || []
            res.render('project-list', {projects})
        } catch (error) {
            console.log(error);
        }
    }
    static addProject = async (req, res) => {
        const { name, category, youtubeUrl } = req.body;
        const file = req.files.thumb
        try {
            cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
                if (result) {
                    await Project.create({
                        name,
                        category,
                        youtubeUrl,
                        thumb: result.url,
                        imageId: result.public_id,
                    })
                    return res.redirect('/admin')
                } else {
                    console.log(err);
                    return res.json({
                        msg: err
                    })
                }
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: error
            })
        }
    }
    static addStream = async (req, res) => {
        const { name, category, facebookUrl } = req.body;
        const file = req.files.thumb;
        try {
            cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
                console.log(result);
                if (result) {
                    await LiveStream.create({
                        name,
                        category,
                        facebookUrl,
                        thumb: result.url,
                        imageId: result.public_id
                    })
                    return res.redirect('/admin/livestream')
                } else {
                    console.log(err);
                    return res.json({
                        msg: err
                    })
                }
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: error
            })
        }
    }
    static deleteProject = async (req, res) => {
        try {
            const {id} = req.params
            await Project.findByIdAndDelete(id, (err, result) => {
                if (result) {
                    res.status(200).json({
                        msg: 'Haha'
                    })
                } else {
                    res.status(400).json({
                        msg: 'Fail'
                    })
                }
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: error
            })
        }
    }
}
module.exports = ProjectController