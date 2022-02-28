const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// subscribe to a user
router.post('/', auth, async (req, res) => {
	try {
		const mychannel = req.body.mychannel;
		const channel2sub = req.body.channel2sub;

		const personToSubscribe = await User.findOne({ channel: channel2sub }).exec();

		if (!mychannel) {
			return res.status(404).json({ error: 'No channel Id specified for logged in user' });
		}

		console.log(mychannel);

		if (
			personToSubscribe.subscribers
				.map((subscriber) => subscriber.channel)
				.includes(mychannel)
		) {
			return res.status(400).json({ error: 'already subscribed' });
		} else {
			const result = await User.updateOne(
				{ channel: channel2sub },
				{ $push: { subscribers: { channel: mychannel } } }
			).exec();

			const result2 = await User.updateOne(
				{ channel: mychannel },
				{ $push: { subscribedto: { channel: channel2sub } } }
			).exec();

			if (result && result2) {
				res.status(200).json({ result, result2 });
			}
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'internal server error' });
	}
});

module.exports = router;
