const mongoose = require('mongoose')
require('dotenv').config()
module.exports = DBConnection = ()=>{
    mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.4xdw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(()=>console.log('DB Connected'))
        .catch((error)=>console.log(error))
}