/* LIBRARY IMPORTS */
const express = require('express')
const bodyParser = require('body-parser') //takes json and converts it to an object

/* LOCAL IMPORTS */
//require mongoose + models
const { mongoose } = require('./db/mongoose.js')
const { User } = require('./models/user')
const { Todo } = require('./models/todo')

//get instance of express
const app = express()

//middleware
app.use(bodyParser.json())

//make post request
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  //save to mongodb collection
  todo.save().then((doc) => {
    res.send(doc)                     //send doc back to client
  }, (e) => {
    res.status(400).send(e)           //send http status & error back to client
  })
})

//route to get todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    //send back an object containting the todos array etc.
    res.send({
      todos
    })
  }, (e) => {
    res.status(400).send(e)
  })
})

//listen on port 3000
app.listen(3000, () => {
  console.log('Server up and running on port 3000...')
})










/* NOTES */

// const newUser = new User({
//   email: 'nicallennn@gmail.com'
// })

// newUser.save().then((doc) => {
//   console.log('Saved user!', doc)
// }, (e) => {
//   console.log('Unable to save user', err)
// })

// /* validators: required, default, minlength, maxlength. trim */

// //create new instance
// const newTodo = new Todo({
//   text: 'Hello World'
// })


//save to the database
// newTodo.save().then((doc) => {
//   console.log('Saved todo!', doc)
// }, (e) => {
//   console.log('Unable to save todo', e)
// })


