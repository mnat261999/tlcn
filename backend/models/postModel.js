const { model, Schema } = require('mongoose');

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: [true,"Please enter title!"],
			trim: true,
			unique: [true,"Title should be unique!"],
		},
		body: {
			type: String,
			required: [true, "Please enter body!"],
		},
		images: {
       		type: Object,
        	required: [true, "Please upload image!"],
		},
		description: {
			type: String,
			required: [true, "Please enter description!"],
		},
		slug: {
			type: String,
			required: [true,"Please enter slug!"],
			trim: true,
			unique: [true,"Title should be unique!"],
		},
		topic:{
			type: String,
			required: [true,"Please choose topic!"],
		},
		userName: {
			type: String,
			required: true,
		},
		userAvatar: {
			type: String
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);
module.exports = model('Posts', postSchema);