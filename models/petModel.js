const mongoose = require("mongoose")

const petSchema = new mongoose.Schema({
    pet_code:{
        type: String,
        unique: true, // la duy nhat
        trim: true, //chuan hoa chuoi
        required: true // bat buoc nhap
    },
    name:{
        type: String,
        required:true
    },
    species:{
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
    status:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status',
        trim: true,
        required:true
    },
    checked:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true //important 
})

module.exports = mongoose.model("Pets", petSchema)