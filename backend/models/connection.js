const mongodb = require('mongodb').MongoClient;

//process.env.MONGODB_URI || 

const MONGO_DB_URL = 'mongodb://localhost:27017/Ebytr';
const DB_NAME = 'Ebytr';

module.exports = () => mongodb.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });