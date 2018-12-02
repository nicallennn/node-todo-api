const mongoose = require('mongoose')

//create a mongoose model -> todo model -> define schema
const Todo = mongoose.model('Todo', {
  //define properties of the model -> define types
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {
  Todo
}