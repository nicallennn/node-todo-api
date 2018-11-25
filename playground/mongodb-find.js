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

  const findId = (id) => {
    db.collection('Todos').find({
      _id: new ObjectID(id)
    }).toArray().then((documents) => {

      console.log(JSON.stringify(documents, undefined, 2))
    }, (err) => {
      console.log(`Unable to fetch todos`, err)
    })
  }

  const totalCount = (completed) => {
    if (completed) {
      db.collection('Todos').find({ completed: true }).count().then((count) => {
        console.log(`You have ${count} todos!`)
      }, (err) => {
        console.log('Unable to fetch todos', err)
      })
    } else {
      db.collection('Todos').find({ completed: false }).count().then((count) => {
        console.log(`You have ${count} todos!`)
      }, (err) => {
        console.log('Unable to fetch todos', err)
      })
    }

  }

  const queryName = (name) => {
    db.collection('users').find({
      name: name
    }).toArray().then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
      console.log('Error: ', err)
    })
  }

  console.log('*****************')
  console.log('***** Todos *****')
  console.log('*****************')


  //test methods
  // findId('5bf9bdf8108923462ede7893')      //find a document based on its _id
  // totalCount(true)                        //count completed todos
  // totalCount(false)                       //count imcomplete todos
  // queryName('Nick Allen')                 //query the users collection for user matching username
  // queryName('Khadija Alban')              


  //close the connection
  client.close()
})  