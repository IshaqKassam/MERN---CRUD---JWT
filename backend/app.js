require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cp = require("cookie-parser")
const Cookies = require("universal-cookie")
const cors = require("cors")

// const authenticate = require("./middleware/auth")

const app = express()

app.use( cors( {
	allowedHeaders: ['Content-Type', 'Authorization'],
	origin: ['http://localhost:3000'],
	credentials: true,
}))
app.use(cp())

app.use(express.json())
// app.use(authenticate)
const ArticleModel = require("./models/Article")
const UserModel = require("./models/User")

app.use("/auth", require("./routes/authRoute") )

app.use("/post", require("./routes/postRoute"))


app.put("/update-post", async (req, res) => {
	const id = req.body.id
	const newTitle = req.body.newTitle
	const newContent = req.body.newContent

	try {
		await ArticleModel.findById(id, (err, updatedArticle) => {
			updatedArticle.title = newTitle
			updatedArticle.content = newContent

			updatedArticle.save()

			res.send("updated")
		})
	} catch (err) {
		console.log(err)
	}
})

app.delete("/delete/:id", async (req, res) => {
	const id = req.params.id

	await ArticleModel.findByIdAndRemove(id).exec()
	res.send("deleted")
})

module.exports = app
