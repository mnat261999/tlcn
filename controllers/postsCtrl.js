const Post = require('../models/postModel')
const ErrorHandler = require('../utils/errorHanler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')


// create posts => /api/admin/posts/new
exports.newPost = catchAsyncErrors (async (req, res, next) => {
    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        post
    })
})

// get all posts =>  /api/posts
exports.getPosts = catchAsyncErrors (async (req ,res, next) => {

    const postsCount = await Post.countDocuments();

    const apiFeatures = new APIFeatures(Post.find(), req.query)
                            .search()
                            .filter()
    const posts = await apiFeatures.query;

    
    res.status(200).json({
        success: true,
        count: posts.length,
        postsCount,
        posts
    })
})


// get single post details => /api/post/:id
exports.getSinglePost = catchAsyncErrors (async(req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler('Post not found', 404));
    }

    res.status(200).json({
        success: true,
        post
    })
})

// Update Post => /api/admin/posts/:id
exports.updatePost = catchAsyncErrors (async (req, res, next) => {
    
    let post = await Post.findById(req.params.id);
    
    if (!post) {
        return next(new ErrorHandler('Post not found', 404));
    }

    post = await post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        post
    })
})

// Delete post => /api/admin/post/:id
exports.deletePost = catchAsyncErrors (async(req, res, next) => {

    const post = await Post.findById(req.params.id)

     
    if (!post) {
        return next(new ErrorHandler('Post not found', 404));
    }

    await post.remove();

    res.status(200).json({
        success: true,
        message: 'Post is deleted'
    })
})
