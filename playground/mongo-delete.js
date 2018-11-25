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

  // deleteMany -> target collection -> deleteMany where text property === 'Eat lunch' string -> callback
  db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((res) => {
    console.log(res)
    //log no. of deleted documents
    console.log(`${res.result.n} Tods were deleted!`)
  })

  // deleteOne -> traget collection -> delete first document where text property === 'Eat lunch' string -> callback
  db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((res) => {
    console.log(res)
  })

  // findOneAndDelete -> deletes and returns deleted document object -> 
  db.collection('Todos').findOneAndDelete({ completed: false }).then((res) => {
    console.log(res)
  })

  //deleteMany where username === 'Nick Allen'
  db.collection('users').deleteMany({ name: 'Nick Allen' }).then((res) => {
    console.log(`${res.result.n} records deleted!`)
  })

  //findOneAndDelete where user _id === '5bfab9b42431972593ff8e2c'
  db.collection('users').findOneAndDelete({ _id: new ObjectID('5bfab9b42431972593ff8e2c') }).then((res) => {
    console.log(JSON.stringify(res, null, 2))
  })

  //close the connection
  client.close()
})  