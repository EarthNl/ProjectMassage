const mysql2 = require('mysql2');

//require('dotenv').config()
//ในเครื่อง
const conn = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "massage_booking",
    dateStrings: 'date',
});

// const pool1 = mariadb.createPool({
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   dateStrings: process.env.MYSQL_DATESTRING,
// });


// Connect to the MySQL server
conn.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL server.');
});

module.exports = {
  db:conn.promise(),
}
