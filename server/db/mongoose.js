//load in mongoose
const mongoose = require('mongoose')

//tell mongoose to use the global promise library
mongoose.Promise = global.Promise

//connect to db
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })

module.exports = {
  mongoose        //es6 shorthand of mongoose: mongoose
}