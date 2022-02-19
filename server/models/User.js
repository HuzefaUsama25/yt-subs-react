const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	channel: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	subscribers: [
		{
			channel: { type: String, required: true },
			subscribed: { type: Boolean, required: true },
		},
	],
});

module.exports = User = mongoose.model('user', UserSchema);
