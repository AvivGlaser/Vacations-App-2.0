
// creating separate DB connection & inserting data so my tests will be independent
// this way I can assure better tests stability

const mysql2 = require("mysql2/promise");
const { hashPassword } = require("../dist/Helpers/AuthHelpers/hashPassword");
const randomNumber = Math.ceil(Math.random() * 9999);


function generateTestUser() {
  return {
    user_name: `testUserName${randomNumber}@test.com`,
    first_name: `testFirstName${randomNumber}`,
    last_name: `testLastName${randomNumber}`,
    password: `testPassword${randomNumber}`,
  };
}

async function insertTestUser() {
  const testUsersArr = [];
  connection = await mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "vacations-app",
  });

  // generate and insert fake users to users table and users arr
  for (let i = 0; i < 1; i++) {
    const user = generateTestUser();
    const hashedPassword = await hashPassword(user.password)
    user.hashedPassword = hashedPassword
    const result = await connection.query(
        `INSERT INTO users (user_name, first_name, last_name, password) VALUES (?,?,?,?)`,
        [user.user_name,
            user.first_name,
            user.last_name,
            hashedPassword]
            );
            testUsersArr.push(user);
        }
  return testUsersArr;
}

async function isUserExistTest(userName){
  // is user exist with independent mysql connection
  connection = await mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "vacations-app",
  });
  const [[result]] = await connection.query('Select * FROM users where user_name = ?', [userName])
  return result
}

module.exports = {insertTestUser, isUserExistTest};
