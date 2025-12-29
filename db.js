const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",     // usually localhost
  user: "root",          // your MySQL username
  password: "Dtyagi@2006",          // your MySQL password (fill if you set one)
  database: "course_db"  // the database you created
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL Connected");
});

module.exports = db;


