const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', (req, res) => {
	res.send('users route');
});

module.exports = router;
