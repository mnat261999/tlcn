'use strict';

const mongoose = require('mongoose')
const { model, Schema } = require('mongoose');


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    type:{
        type: Schema.Types.ObjectId,
        ref: 'tyepages',
        trim: true,
        required:true
    },
    nameType:{
        type: String,
        required: true,
    },
    parentId: {
        type: String
    }/* ,
    products: [{ type: Schema.Types.ObjectId, ref: 'products' }] */

}, {
    timestamps: true
})

module.exports = model("Category", categorySchema)