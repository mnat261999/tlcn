const Post = require('../models/postModel')
const ErrorHandler = require('../utils/errorHanler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')


// create posts => /api/admin/posts/new
exports.createPost = (req, res) => {
	return res.json({data:'Post'})
};

