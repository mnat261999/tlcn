const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHanler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Category = require('../models/categoryModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    searching() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
 
        //console.log({before:queryObj}) // before delete page
 
        const excludedFields = ['page', 'sort', 'limit', 'keyword']
        excludedFields.forEach(el => delete(queryObj[el]))
 
        //console.log({after:queryObj}) // after delete page
 
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //console.log({queryStr})
 
        this.query.find(JSON.parse(queryStr))
 
        return this
     }
 
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            //console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('createdAt')
        }

        return this;
    } 

    paginating(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        console.log({currentPage})
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;

    }
}

// create new product => /api/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    try {
        const {name, price, description, content, stock, images, category} = req.body;
        if(!images) return res.status(400).json({msg: "No image upload"})



        const product = await Product.findOne({name})
        if(product)
            return res.status(400).json({msg: "This product already exists."})

        const newProduct = new Product({
            name, price, description, content, stock, images, category
        })

       const productnew= await newProduct.save()
       //console.log('product1',{product})

        res.json({
            msg: "Created a product",
            productnew
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// get all products =>  /api/products?keyword=cat
exports.getProducts = catchAsyncErrors (async (req ,res, next) => {

    const productsCount = await Product.countDocuments();
    const resPerPage = 9;

    const features = new APIfeatures(Product.find(), req.query)
    .filtering() .sorting() .searching() .paginating(resPerPage)

    const products = await features.query;

    
    res.json({
        status: 'success',
        result: products.length,
        productsCount,
        resPerPage,
        products:products
    })
})

exports.getInforLimitProducts = catchAsyncErrors (async (req ,res, next) => {
    const products_list = await Product.find({})
    .select("_id name price images category content")

    res.json({
        products_list:products_list
    })
})
// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.json(products)

})

// get single product details => /api/products/:id
exports.getSingleProduct = catchAsyncErrors (async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product => /api/admin/products/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product => /api/admin/products/:id
exports.deleteProduct = catchAsyncErrors (async(req, res, next) => {

    const product = await Product.findById(req.params.id)

     
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})