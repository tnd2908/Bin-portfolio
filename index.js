const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const ejs = require('ejs')

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')
const pageRouter = require('./Route/page')
app.use('/', pageRouter)
app.get("/upload/:name", (req, res)=>{
    const {name} = req.params
    console.log(path.join(__dirname, '/public/img/')+name)
    res.sendFile(path.join(__dirname, '/public/img/')+name)
})
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server is running on ${PORT} `))