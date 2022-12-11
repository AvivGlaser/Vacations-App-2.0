const { expect } = require("chai");
const dotenv = require("dotenv");
dotenv.config();
const  {insertTestUser, isUserExistTest}  = require("../test.helper");
const  {isPasswordMatch}  = require("../../dist/Helpers/AuthHelpers/isPasswordMatch");

describe("User Auth test", () => {
  it("User exist - success", async () => {
    //generate and insert test user
      const user = await insertTestUser()
      // check if exist
      const userDB = await isUserExistTest(user[0].user_name)
      expect(typeof userDB).to.be.equal("object")
      expect(userDB).to.not.be.null
      expect(userDB).to.not.be.undefined
    }),
  it("User not exist", async () => {
      const userDB = await isUserExistTest("userNameThatNotExist")
      expect(userDB).to.be.undefined
    }),
  it("Is password match - success", async () => {
    //isPasswordMatch compares original user password and crypted password
    const user = await insertTestUser()
    const userDB = await isUserExistTest(user[0].user_name)
    //userDB is sent as crypted password from (only kept in DB)
    //user[0].password is sent as the plain password 
    const result = await isPasswordMatch(userDB, user[0].password)
    expect(result).to.be.true
    }),
  it("Is password match - failure", async () => {
    const user = await insertTestUser()
    const userDB = await isUserExistTest(user[0].user_name)
    const result = await isPasswordMatch(userDB, user[0].password + "wrong password")
    expect(result).to.be.false
    })
  })

