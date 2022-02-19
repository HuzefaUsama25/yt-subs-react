const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// get all users
router.post('/id=:channelId', async (req, res) => {
	const channelId = req.params.channelId;
	User.updateOne(
		{ channel: channelId },
		{ $push: { subscribers: { channel: 'mychannelid', subscribed: false } } }
	).then((result) => {
		res.status(200).send(result);
	});
});

module.exports = router;
