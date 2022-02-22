const ArticleModel = require("../models/Article")

exports.readPosts = async (req, res) => {
	const title = req.body.searchTitle
	if (title) {
		ArticleModel.findOne({ title: title }, (err, result) => {
			if (err) {
				res.send(err)
			}

			res.send(result)
		})
	} else {
		ArticleModel.find({}, (err, result) => {
			if (err) {
				res.send(err)
			}

			res.send(result)
		})
	}
}

exports.createPost = async (req, res) => {
	const articleTitle = req.body.title
	const articleContent = req.body.content

	const article = new ArticleModel({
		title: articleTitle,
		content: articleContent,
	})

	try {
		await article.save()
		res.send("done")
		console.log("done")
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}
