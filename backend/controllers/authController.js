const bcrypt = require('bcryptjs')
const UserModel = require('../models/User')
const jwt = require( 'jsonwebtoken' )
const Cookies = require('universal-cookie')

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!(email && password)) {
			res.status(400).send("All inputs required")
		}

		const user = await UserModel.findOne({ email })

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			)

			user.token = token

			res.status(201).json(user)
		}
		res.status(400).send({ message: "Invalid Credentials" })
	} catch (err) {
		console.error(err)
	}
}

exports.register = async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body

		if (!(email && password && first_name && last_name)) {
			res.status(400).send("All inputs are required")
		}

		const oldUser = await UserModel.findOne({ email })

		if (oldUser) {
			return res.status(409).send("User already exists, Please Log In")
		}

		encryptedPassword = await bcrypt.hash(password, 10)

		const user = await UserModel.create({
			first_name,
			last_name,
			email: email.toLowerCase(),
			password: encryptedPassword,
		})

        

		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		)

		user.token = token

		res.cookie("token", token, {
			sameSite: 'Lax'
		})

		console.log("token from cookie from server is ", res.cookie.token)
		console.log("token from server is ", token)

		res.status(201).json(user)
	} catch (err) {
		console.log(err.message.data)
	}
}

exports.logout = async ( req, res ) => {
	const cookies = new Cookies()
	return res.headers.cookie.token = null
}