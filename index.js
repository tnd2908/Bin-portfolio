const express = require('express')
const app = express()
const http = require('http')
const ejs = require('ejs')
app.set('views', __dirname + '/views');
app.use(express.static('public'))
const pageRouter = require('./Route/page')
app.set('view engine', 'ejs')
// app.use('/', pageRouter)
app.get('/', (req, res)=> res.render('home.ejs'))
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server is running on ${PORT}`))