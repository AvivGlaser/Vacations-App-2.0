const mysql2 = require("mysql2/promise");
// creating separate DB connection & data so my tests will be independent
// this way I can assure better tests stability


console.log("Test is Connecting to DB...");

const {
  MYSQL_DB_HOST: host,
  MYSQL_DB_PORT: port,
  MYSQL_DB_USER: user,
  MYSQL_DB_PASSWORD: password,
  MYSQL_DB_SCHEMA: database,
} = process.env;

let connection = null;

async function initDB() {
  try {
    connection = await mysql2.createConnection({
      host,
      port,
      user,
      password,
      database
    });
    
  } catch (error) {
    console.log("Application shut down due to MySQL connection error", error);
    process.exit(1);
  }
}
function getConnection() {
  return connection;
}

module.exports = { initDB, getConnection };