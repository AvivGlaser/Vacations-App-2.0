const { expect } = require("chai");
const dotenv = require("dotenv");
dotenv.config();
const { insertTestUser } = require("../test.helper");
const { BASE_URL } = process.env;
const axios = require("axios");

describe("/POST Login", () => {
  it("login success", async () => {
    try {
      const user = await insertTestUser()
      const response = await axios.post(`${BASE_URL}/auth/login`,{
        userName: user[0].user_name,
        password: user[0].password,
      })
      expect(response.data.status).to.be.equal(200);
      expect(response.data.token).to.be.true
      expect(response.data.token).is.not.null
    } catch (err) { 
      
    }

  })
  it("login failure- wrong user name", async () => {
    try {
      const user = await insertTestUser()
       await axios.post(`${BASE_URL}/auth/login`,{
        userName: user[0].user_name+ "wrong userName",
        password: user[0].password,
      })
    } catch (err) { 
      expect(err.response.data.message).to.be.equal("Your credentials are incorrect. Plesae try again.");
      expect(err.response.status).to.be.equal(400);
      expect(err.response.data.token).to.be.undefined
    }
  })
  it("login failure - wrong password", async () => {
    try {
      const user = await insertTestUser()
      await axios.post(`${BASE_URL}/auth/login`,{
        userName: user[0].user_name,
        password: user[0].password + "wrong Password",
      })
    } catch (err) { 
      expect(err.response.data.message).to.be.equal("Your credentials are incorrect. Plesae try again.");
      expect(err.response.status).to.be.equal(400);
    }
  })
})

