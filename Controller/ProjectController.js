const Project = require("../Model/Project");

class ProjectController {
    static getListViral = async (req, res) =>{
        res.render('detail')
    }
    static addProjectPage = (req, res) => {
        res.render('add-project')
    } 
    static addProject = async (req, res) => {
        // const { thumb } = req.body;
        try {
            // await Project.create({
            //     name,
            //     category,
            //     youtubeUrl,
            //     thumb,
            // })
            console.log(req.file);
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