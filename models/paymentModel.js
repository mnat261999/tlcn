const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:String
    },
    total: {
        type: Number
    },
    paymentID:{
        type: String
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Number,//0:hủy ; 1: chưa thanh toán; 2: đã thanh toán
        default:0,
        required: true
    },
    statusName:{
        type:String,
        required: true
    },
    type:{
        type:Number,//1: thanh toán khi nhận hàng; 2: thanh toán bằng paypal
        required: true
    },
    typeName:{
        type:String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)