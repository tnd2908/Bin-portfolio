const express = require('express')
const app = express()
const ejs = require('ejs') 
app.use(express.static('public'))
const pageRouter = require('./Route/page')
app.set('view engine', 'ejs')
app.use('/', pageRouter)
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server is running on 4000'))