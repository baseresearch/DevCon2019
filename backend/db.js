const MongoClient = require('mongodb').MongoClient;
const mongodbUri = 'mongodb://localhost:27017';

let db = null;

exports.connect = async () => {
  MongoClient.connect(mongodbUri, (err) => {
    if (err) console.error(err);
    db = client.db('devcon_2019');
  });
}
