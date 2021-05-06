const Post = require('../models/postModel')
const ErrorHandler = require('../utils/errorHanler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const formidable = require("formidable");

// create posts => /api/admin/posts/new
exports.createPost = (req, res) => {
	const form = formidable({multiples: true});

	form.parse(req, (error, fields, files) => {
		const {title, body, description, slug, id, user	} = fields;
		const errors = [];
		if(title === ''){
			errors.push({msg: 'Title is required'})
		}
		if(body === ''){
			errors.push({msg: 'Body is required'})
		}
		if(description === ''){
			errors.push({msg: 'Description is required'})
		}
		if(title === ''){
			errors.push({msg: 'Title is required'})
		}
		if(slug === ''){
			errors.push({msg: 'Slug is required'})
		}
		if(errors.length !==0){
			return res.status(400).json({errors});
		}
		return res.json({ fields })
	})

};

