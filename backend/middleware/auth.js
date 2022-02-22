const jwt = require("jsonwebtoken")
require("dotenv").config()

const ensureAuthenticated = async (req, res, next) => {
	if (req.headers.authorization) {
		try {
			console.log("headers received", req.headers.authorization)
			const token = req.headers.authorization.split(" ")[1]
			var verify = await jwt.verify(token, process.env.TOKEN_KEY)
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
