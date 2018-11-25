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

  /***************************************  
   *  ******* MOGO DELETE METHODS ********
   *  ===================================*
   * -> DELETE FROM TODOS COLLECTION,    *
   * -> DELETE FROM USERS COLLECTION     *
   * ************************************/

  const deleteMatchesText = (text, all) => {
    //if all === true -> delete all documents, else -> delete first instance
    if (all) {
      // deleteMany -> target collection -> deleteMany where text property === 'Eat lunch' string -> callback
      db.collection('Todos').deleteMany({ text: text }).then((res) => {
        console.log(res)
        //log no. of deleted documents
        console.log(`${res.result.n} Todos were deleted!`)
      })
    } else {
      // deleteOne -> traget collection -> delete first document where text property === 'Eat lunch' string -> callback
      db.collection('Todos').deleteOne({ text: text }).then((res) => {
        console.log(res)
      })
    }
  }

  const deleteOneTodo = (completed) => {
    if (completed) {
      // findOneAndDelete -> deletes and returns deleted document object 
      db.collection('Todos').findOneAndDelete({ completed: true }).then((res) => {
        console.log(res)
      })
    } else {
      db.collection('Todos').findOneAndDelete({ completed: false }).then((res) => {
        console.log(res)
      })
    }
  }

  const deleteAllUsersOnName = (name) => {
    //deleteMany where username === 'Nick Allen'
    db.collection('users').deleteMany({ name: name }).then((res) => {
      console.log(`${res.result.n} records deleted!`)
    })
  }

  const deleteUserByID = (id) => {
    //findOneAndDelete where user _id === id
    db.collection('users').findOneAndDelete({ _id: new ObjectID(id) }).then((res) => {
      console.log(JSON.stringify(res, null, 2))
    })
  }

  //close the connection
  client.close()
})  