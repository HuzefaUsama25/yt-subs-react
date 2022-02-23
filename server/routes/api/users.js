const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// get all users
router.get('/', async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
});

// get latest 10 users
router.get('/new=:number', async (req, res) => {
	const users = await User.find({}, ['channel'], {
		skip: 0,
		limit: req.params.number,
		sort: {
			date: 'descending',
		},
	});
	res.json(users);
});

// post new user
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter valid Email').isEmail(),
		check('password', 'Enter password with a mininum of 6 characters').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, channel } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}

			user = new User({
				name,
				email,
				password,
				channel,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 3600000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
