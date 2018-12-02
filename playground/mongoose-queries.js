const { ObjectId } = require('mongodb')
const { mongoose } = require('../server/db/mongoose.js')

//import models
const { Todo } = require('../server/models/todo.js')
const { User } = require('../server/models/user.js')

//id to use for querying
const id = '5c03edc938f7300721a305cd'
const userId = '5c03d8ba822d24045f09cf4d'

if (!ObjectId.isValid(id)) {
  console.log('Id is not valid')
}

//find user by id
User.findById(userId).then((user) => {
  //if no user found -> return log message
  if (!user) {
    return console.log('No user found!')
  }
  //if user found -> log success case message
  console.log('User found: ', JSON.stringify(user, null, 2))
}).catch((e) => {
  //if an error is thrown -> log error object
  console.log('Error: ', e)
})

// //find all todos where _id === id
// Todo.find({
//   _id: id                       //pass in string id -> mongoose converts to object id and then runs query
// }).then((todos) => {
//   if (todos.length > 0) {
//     console.log('Todos', todos)
//   }
// })

// //find one todo where _id === id
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (todo) {
//     console.log('Todo: ', todo)
//   }

// })

// //find todo by id where _id === id
// Todo.findById(id).then((todo) => {
//   ///if the id is not found, return error message
//   if (!todo) {
//     return console.log('Id not found!')
//   }
//   //if id is found, log the details of the todo
//   console.log('Todo by id: ', todo)
// }).catch((e) => {
//   console.log(e)
// })