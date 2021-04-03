const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHanler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

// create new product => /api/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// get all products =>  /api/products?keyword=cat
exports.getProducts = catchAsyncErrors (async (req ,res, next) => {

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage)
    const products = await apiFeatures.query;

    
    res.status(200).json({
        success: true,
        count: products.length,
        productsCount,
        products
    })
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