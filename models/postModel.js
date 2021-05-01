const mongoose = require('mongoose')


const postsSchema = new mongoose.Schema({
    URLtitle: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateWriting: {
        type: Date,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    }

},
{
    timestamps: true
})

module.exports = mongoose.model("Posts", postsSchema)