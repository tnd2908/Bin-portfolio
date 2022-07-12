const Project = require("../Model/Project");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

class ProjectController {
    static getListViral = async (req, res) =>{
        res.render('detail')
    }
    static addProjectPage = (req, res) => {
        res.render('add-project')
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
                        thumb: result.url
                    })
                } else {
                    console.log(err);
                }
                console.log(result);
            })
            res.json({
                msg: 'aaa',
                body: req.body,
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