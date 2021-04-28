const mongoose = require("mongoose")

const caseSchema = new mongoose.Schema({
    case_id:{
        type: String,
        unique: true, // la duy nhat
        trim: true, //chuan hoa chuoi
        required: true // bat buoc nhap
    },
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    color:{
        type: String,
        required:true
    },
    weight:{
        type: Number,
        trim: true,
        required:true
    },
    sex:{
        type: String,
        required:true
    },
    vaccination:{
        type: String,
        required:true
    },
    moreinfor:{
        type: String,
        trim: true,
        required:true
    },
    images:{
        type: Object,
        required: true
    },
    staus:{
        type: String,
        trim: true,
        required:true
    }
},{
    timestamps: true //important 
})

module.exports = mongoose.model("Cases", caseSchema)