const express = require('express')
const app = express()
const http = require('http')
// const ejs = require('ejs')
app.use(express.static('public'))
// const pageRouter = require('./Route/page')
// app.set('views', './views');
// app.set('view engine', 'ejs')
// app.use('/', pageRouter)
app.get('/', (req, res)=> res.send('<h1>Hello</h1>'))
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server is running on ${PORT}`))