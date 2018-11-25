//get the mongo client
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb')    //use destructuring to get specifics from mongodb object

//connect to db -> url, callback function -> return error, db object
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    //return to break function -> print error message to user
    return console.log('Unable to connect to MongoDB server')
  }

  //print success message to user
  console.log('Connected to MongoDB')

  //get the db object from the client object, pointing at TodoApp collection
  const db = client.db('TodoApp')


  //////////////////************** INSERT INTO MONGO DATABASE ******************//////////////////////

  //insert new record into 'Todos' collection
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, res) => {
    if (err) {
      return console.log('Unable to insert todo', err)
    }

    //print success message and inserted record 
    console.log('Document added successfully!')
    console.log(JSON.stringify(res.ops, undefined, 2))
  })

  //insert new record into 'users' collection
  db.collection('users').insertOne({
    name: 'Nick Allen',
    age: 28,
    email: 'nicallennn@gmail.com'
  }, (err, res) => {
    if (err) {
      return console.log('Unable to add document')
    }

    //print success message and inserted record 
    console.log('Document added successfully!')
    console.log(JSON.stringify(res.ops, undefined, 2))
  })


  //close the connection
  client.close()
})  