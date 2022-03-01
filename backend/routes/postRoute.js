const express = require("express")
const router = express.Router()

const {ensureAuthenticated} = require("../middleware/auth")
const postController = require("../controllers/postController")

router.use(ensureAuthenticated)

router.post('/create',  postController.createPost )
router.get('/read', postController.readPosts )

module.exports = router