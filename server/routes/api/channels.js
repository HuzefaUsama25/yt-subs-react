const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', async (req, res) => {
	const users = await User.find({}, ['channel'], {
		skip: 0,
		limit: 10,
		sort: {
			date: 'descending',
		},
	});
	res.json(users);
});

module.exports = router;
