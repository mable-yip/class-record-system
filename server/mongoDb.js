import { default as mongodb } from 'mongodb'

let database, userDb, classHistoryDb, classDb;

const CONNECTION_URL = `mongodb+srv://hoypqn4:amLP5483@cluster0.6iqab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const DATABASE_NAME = "class-record-system"
let MongoClient = mongodb.MongoClient

// export const getDatabase = MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//     if(error) {
//         throw error;
//     }
//         // userDb = database.collection("user");
//     // classHistoryDb = database.collection("classHistory");
//     // classDb = data.collection("class")
//     console.log("Connected to `" + DATABASE_NAME + "`!");

//     database = client.db(DATABASE_NAME)
//     console.log("pppppppppppp", database.collection("user"))
//     return database
//     // userDb = database.collection("user");
//     // classHistoryDb = database.collection("classHistory");
//     // classDb = data.collection("class")
//     // console.log("Connected to `" + DATABASE_NAME + "`!");
// });


// var _db;

// module.exports = {

//   connectToServer: function( callback ) {
//     MongoClient.connect( CONNECTION_URL,  { useNewUrlParser: true }, function( err, client ) {
//       _db  = client.db('test_db');
//       return callback( err );
//     } );
//   },

//   getDb: function() {
//     return _db;
//   }
// };

class Mongo {
    constructor () {
        this.client = new MongoClient(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async main () {
        await this.client.connect();
        console.log('Connected to MongoDB');

        this.db = this.client.db(DATABASE_NAME);
    }
}

module.exports = new Mongo();