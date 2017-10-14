const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "mysqlcluster22.registeredsite.com",
  user: 'toastadmin',
  password: '!Qaz2wsx3edc',
  database: 'toasthabit'
})

connection.connect();

connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
  console.log(`mysql connected`)
});

module.exports = connection;