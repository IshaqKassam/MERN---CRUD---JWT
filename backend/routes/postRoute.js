const express = require("express")
const router = express.Router()

const {ensureAuthenticated} = require("../middleware/auth")
const postController = require("../controllers/postController")

router.use(ensureAuthenticated)

router.post('/create', ensureAuthenticated,  postController.createPost )
router.get('/read', ensureAuthenticated, postController.readPosts )

module.exports = router