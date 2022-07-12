const User = require("../Model/user");
const bcrypt = require('bcrypt')
class AuthController {
    static login = async (req, res) => {
        const { username, password } = req.body
        try {
            const user = await User.findOne({ username })
            if (!user) {
                res.render('login', {msg: 'Sai tài khoản hoặc mật khẩu'})
            }
            else if (user) {
                await bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        res.redirect('/')
                    }
                    else res.render('login', {msg: 'Sai tài khoản hoặc mật khẩu'})
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
}
module.exports = AuthController