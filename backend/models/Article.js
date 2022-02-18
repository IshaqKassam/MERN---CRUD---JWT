const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

const Articles = mongoose.model("Articles", ArticleSchema)
module.exports = Articles