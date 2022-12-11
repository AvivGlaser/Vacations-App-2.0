const mysql2 = require("mysql2/promise");

console.log("Connecting to DB...");
let connection = null;


const {
  MYSQL_DB_HOST: host,
  MYSQL_DB_PORT: port,
  MYSQL_DB_USER: user,
  MYSQL_DB_PASSWORD: password,
  MYSQL_DB_SCHEMA: database,
} = process.env;

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

export { initDB, getConnection };