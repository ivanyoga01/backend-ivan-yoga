require('dotenv').config(); // this is important!
const { dbConfig } = require('./index');

const env = process.env.NODE_ENV;
let db;

if (env) {
  db = dbConfig[env];
} else {
  db = dbConfig['app'];
}

module.exports = db;