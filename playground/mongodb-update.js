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
   *  ******* MOGO UPDATE METHODS ********
   *  ===================================*
   * -> UPDATE A TODO FROM ID,           *
   * -> DELETE FROM USERS COLLECTION     *
   * ************************************/

  //update a document field on id -> findOneAndUpdate returns the original document, not upated document
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5bfab7192431972593ff8dd1')
  }, {
      $set: {
        completed: true
      }
    }, {
      returnOriginal: false
    }).then((res) => {
      console.log(res)
    })

  db.collection('users').findOneAndUpdate({
    _id: new ObjectID('5bf9c717108923462ede7986')
  }, {
      $set: {
        name: 'Nikolas Allen'
      },
      $inc: {
        age: 5
      }
    }, {

    }).then((res) => { console.log(res) })
  //close the connection
  client.close()
})  