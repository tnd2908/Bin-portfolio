const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const DBConnection = require('./Config/db')
const fileUpload = require('express-fileupload')
const ejs = require('ejs')
const session = require('express-session');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')
app.use(fileUpload({
    useTempFiles: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 *24
    }
}))
DBConnection()

const pageRouter = require('./Route/page')
const projectRouter = require('./Route/project')
const adminRouter = require('./Route/admin')


app.use('/project', projectRouter)
app.use('/admin', adminRouter)
app.get('/upload/:name', (req, res)=>{
    const {name} = req.params
    console.log(path.join(__dirname, '/public/img/')+name)
    res.sendFile(path.join(__dirname, '/public/img/')+name)
})
app.get('/', pageRouter)

const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server is running on ${PORT} `))