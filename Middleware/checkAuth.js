const User = require("../Model/user")

module.exports = async (req, res, next) => {
    try {
        const id = req.session.userId
        if (id) {
            // await User.findById(id, (error, user) => {
            //     if (!user || error) {
            //         res.redirect('/')
            //     } else {
            //         next();
            //     }
            // })     
            next();  
        } else {
            res.redirect('/')
        }
         
    } catch (error) {
        console.log(error);
    }
}