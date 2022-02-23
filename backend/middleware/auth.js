const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const Cookies = require("universal-cookie")
require("dotenv").config()

const ensureAuthenticated = async (req, res, next) => {
  if (req.cookies) {
    try {
      const cookies = new Cookies(req.headers.cookie)
      console.log("headers received", req.headers.cookie)
      var verify = await jwt.verify(cookies.get("token"), process.env.TOKEN_KEY)
      // console.log("verify")
      verify && next()
    } catch (err) {
      // if (err.message === 'jwt expired'){
      res.status(400).send("Session Expired, Please Log In")
      next(err.message) //
      // }
    }
  }
}

module.exports = {
  ensureAuthenticated,
}
