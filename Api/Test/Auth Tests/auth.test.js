const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { BASE_URL } = process.env;
const { signToken } = require("../../dist/Helpers/AuthHelpers/signToken");
const { hashPassword } = require("../../dist/Helpers/AuthHelpers/hashPassword");

//generating token to use during my tests
const token = signToken({
  user_name: "testUser",
  first_name: "testName",
  password: "testPassword",
});

describe("Auth handler Tests", () => {
  it("Fetch Vacations without token - Unauthorized", async () => {
    try {
      await axios.get(`${BASE_URL}/vacations`);
    } catch (ex) {
      expect(ex.response.data.message).to.be.equal("Unauthorized");
      expect(ex.response.status).to.be.equal(401);
    }
  }),
  it("payment page without token - Unauthorized", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/payment`);
    } catch (ex) {
      expect(ex.response.data.message).to.be.equal("Unauthorized");
      expect(ex.response.status).to.be.equal(401);
    }
  }),
  it("Fetch Vacations with wrong token - Unauthorized", async () => {
    try {
      await axios.get(`${BASE_URL}/vacations`, {
        headers: {
          authorization: token + "wrong token"
        }
        });
    } catch (ex) {
      expect(ex.response.data.message).to.be.equal("Unauthorized");
      expect(ex.response.status).to.be.equal(401);
    }
  }),
  it("Fetch Vacations with token - Authorized", async () => {
    try {
      const result = await axios.get(`${BASE_URL}/vacations`, {
        headers: {
          authorization: token 
        }
        });
        expect(result.status).to.be.equal(200)
        expect(result.data).is.not.null
    } catch (ex) {
      console.log(ex);
    }
  });
  it("Hashed password - success", async () => {
    const plainPassword = "password1234"
   const hashedPassword = await hashPassword(plainPassword);
   expect(hashedPassword).to.not.be.equal(plainPassword)
   expect(hashedPassword.length).to.be.greaterThan(plainPassword.length)
   expect(hashedPassword).to.include("$")
  });
  it("Hashed password - failure", async () => {
    try {
      const plainPassword = 6666
   const result = await hashPassword(plainPassword);
    } catch (error) {
   expect(error.message).to.include("data must be a string");
    }
  });})
