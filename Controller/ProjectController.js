const LiveStream = require("../Model/LiveStream");
const Project = require("../Model/Project");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const itemsPerPage = 12
class ProjectController {
    static getDetail = async (req, res) =>{
        try {
            const {id} = req.params;
            const detail = await Project.findById(id)
            if (detail) {
                const { category, name } = detail
                let link = ''
                if (detail.youtubeUrl.includes('watch?v=')) {
                    link = detail.youtubeUrl.replace('watch?v=', 'embed/')
                } else {
                    link = detail.youtubeUrl.replace('.be/', 'be.com/embed/')
                }
                res.render('detail', {detail: {
                    name,
                    category,
                    youtubeUrl: link
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
            const projects = await Project.find({}).skip((+page - 1) * 12).limit(12) || []
            const total = await Project.countDocuments()
            res.render('project-list', {projects, total: Math.ceil(total / itemsPerPage) })
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
            const projects = await Project.find({category}).skip((page - 1 )* 12).limit(12) || []
            const total = await Project.countDocuments({category})
            res.render('project-list', {projects, total: Math.ceil(total / itemsPerPage)})
        } catch (error) {
            console.log(error);
        }
    }
    static addProject = async (req, res) => {
        const { name, category, youtubeUrl } = req.body;
        const image = req.files
        try {
            if (name, category, youtubeUrl, image) {
                const file = req.files.thumb
                cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
                    if (result) {
                        await Project.create({
                            name,
                            category,
                            youtubeUrl,
                            thumb: result.url,
                            imageId: result.public_id,
                        })
                        return res.json({
                            msg: 'Th??m th??nh c??ng'
                        })
                    } else {
                        return res.status(400).json({
                            msg: '???? x???y ra l???i'
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    msg: '???? x???y ra l???i'
                })
            }
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
                if (result) {
                    await LiveStream.create({
                        name,
                        category,
                        facebookUrl,
                        thumb: result.url,
                        imageId: result.public_id
                    })
                    return res.json({
                        msg: 'Th??m th??nh c??ng'
                    })
                } else {
                    return res.status(400).json({
                        msg: '???? x???y ra l???i'
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                msg: '???? x???y ra l???i'
            })
        }
    }
    static deleteProject = async (req, res) => {
        try {
            const {id, public_id} = req.params
            await Project.findByIdAndDelete(id, (err, result) => {
                if (result) {
                    cloudinary.uploader.destroy(public_id, (response) => {
                        return res.status(200).json({
                            msg: 'Haha'
                        })
                    })
                } else {
                    return res.status(400).json({
                        msg: 'Fail'
                    })
                }
            }).clone()
        } catch (error) {
            return res.json({
                msg: error,
            })
        }
    }
    static deleteLivestream = async (req, res) => {
        try {
            const {id, public_id} = req.params
            await LiveStream.findByIdAndDelete(id, (err, result) => {
                if (result) {
                    cloudinary.uploader.destroy(public_id, (response) => {
                        return res.status(200).json({
                            msg: 'Haha'
                        })
                    })
                } else {
                    console.log(err);
                    console.log('fail 1');
                    return res.status(400).json({
                        msg: 'Fail'
                    })
                }
            }).clone()
        } catch (error) {
            console.log('fail 2');
            return res.status(400).json({
                msg: error,
            })
        }
    }
    static editProject = async (req, res) => {
        try {
            const {id} = req.params;
            const {name, youtubeUrl, category} = req.body
            const file = req.files
            if (!file) {
                await Project.findByIdAndUpdate(id, {name, youtubeUrl, category})
                res.redirect('/admin')
            } else {
                res.redirect('/admin')
            }
        } catch (error) {
            console.log(error);
        }
    }
    static editLivestream = async (req, res) => {
        try {
            const {id} = req.params;
            const {name, facebookUrl} = req.body
            const file = req.files
            if (!file) {
                await LiveStream.findByIdAndUpdate(id, {name, facebookUrl})
                res.redirect('/admin/livestream')
            } else {
                res.redirect('/admin/livestream')
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ProjectController