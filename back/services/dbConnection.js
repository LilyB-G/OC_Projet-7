let mysql = require('mysql2');

let connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
});

connection.connect(function(err) {
  if (err) throw err;
  
});

module.exports = connection;