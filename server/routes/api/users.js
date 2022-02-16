const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// get all users
router.get('/', async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
});

// post new user
router.post('/', async (req, res) => {
	const { name, email, password, channel } = req.body;
	const user = new User({
		name,
		email,
		password,
		channel,
	});
	user.save();
	res.status(200).json({ sucess: 'User added' });
});

module.exports = router;
