const { model, Schema } = require('mongoose');

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		images: {
       		type: Object,
        	required: true
		},
		description: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);
module.exports = model('Posts', postSchema);