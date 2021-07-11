const mongoose = require('mongoose')

const productSchema  = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    discount:{
        type: Number,
        required: [true, 'Please enter product discount'],
        default: 0.0
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    content:{
        type: String,
        required: [true, 'Please enter product content']
    },
    ratings: {
        type : Number,
        default: 0
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    stock: {
        type : Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    sold:{
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            avatar:{
                type: String,
                required: true, 
            },
            name: {
                type: String,
                required: true, 
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            reply: {
                type: Array,
                default: []
            },
            time: 
            { 
                type: Date, 
                required: true, 
                default: Date.now 
            }
        }
    ]
},
    {
    timestamps: true //important
})


module.exports = mongoose.model('Product', productSchema);