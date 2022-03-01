const jwt = require("jsonwebtoken")
const Cookies = require("universal-cookie")
require("dotenv").config()

const ensureAuthenticated = async (req, res, next) => {
  try {
    const cookies = new Cookies(req.headers.cookie)
    console.log("headers received", req.headers.cookie)
    console.log("cookie in the middleware, ", cookies.get("token"))
    var verify = await jwt.verify((cookies.get("token")), process.env.TOKEN_KEY)
    verify && next()
  } catch (err) {
    res.send("Session Expired, Please Log In")
    // next(err.message)
  }
}

module.exports = {
  ensureAuthenticated,
}
