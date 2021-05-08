import { default as mongodb } from 'mongodb'

const CONNECTION_URL = `mongodb+srv://hoypqn4:amLP5483@cluster0.6iqab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const DATABASE_NAME = "class-record-system"
let MongoClient = mongodb.MongoClient


export const getCollection = () => {
  console.log("hdqdqwwwwwwwwwwwwwwwwwwi")
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      console.log("eeeeeeeeeeeeeeeee");
      throw error;
    }
    console.log("dqwddddddddddddddd");
    const database = client.db(DATABASE_NAME);
    console.log(database)

    return database

  })
}

//export const getCollection = (name) => database.collection(name);