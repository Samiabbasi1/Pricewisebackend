const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'sami123',
  database: 'pricewise'
});


// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = db;