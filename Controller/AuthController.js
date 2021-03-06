const User = require("../Model/user");
const Profile = require("../Model/Profile");

const bcrypt = require('bcrypt')
class AuthController {
    static login = async (req, res) => {
        const { username, password } = req.body
        try {
            const user = await User.findOne({ username }).clone()
            if (!user) {
                return res.status(400).json({
                    msg: 'asdsada'
                })
            } else {
                await bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.userId = user._id
                        return res.json({
                            msg: ''
                        })
                    }
                    else return res.status(400).json({
                        msg: 'asdsad'
                    })
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: error,
            })
        }
    }
    static register = async (req, res) => {
        const {username, password} = req.body;
        try {
            const isUser = await User.findOne({username});
            if (isUser) {
                return res.status(400).json({
                    msg: 'User is already exist'
                })
            } else {
                await User.create({username, password})
                return res.status(200).json({
                    msg: 'Created user successfully'
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                msg: error,
            })
        }
    }
    static resetPassword = async (req, res) => {
        try {
            const pw = await bcrypt.hash('Bin123@', 10)
            await User.findOneAndUpdate({username: 'admin'}, {password: pw})
            res.json({
                msg: 'OK done!!!'
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                msg: error,
            })
        }
    }
    static changePassword = async (req, res) => {
        try {
            const {password, newPassword} = req.body
            const user = await User.findOne({username: 'admin'})
            await bcrypt.compare(password, user.password, async (err, same) => {
                if (same) {
                    const pw = await bcrypt.hash(newPassword, 10)
                    await User.findOneAndUpdate({username: 'admin'}, {password: pw}) 
                    return res.redirect('/admin')
                }
                else return res.status(400).json({
                    msg: 'M???t kh???u c?? kh??ng ????ng'
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AuthController