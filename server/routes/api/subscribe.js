const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// get all users
router.post('/id=:channel2sub', auth, async (req, res) => {
	try {
		const mychannelid = req.body.mychannelid;
		const channel2sub = req.params.channel2sub;
		const user = await User.findOne({ channel: channel2sub }).exec();

		if (!mychannelid) {
			return res.status(404).json({ error: 'No channel Id specified for logged in user' });
		}

		if (user.subscribers.map((e) => e.channel).includes(mychannelid)) {
			return res.status(400).json({ error: 'already subscribed' });
		} else {
			User.updateOne(
				{ channel: channel2sub },
				{ $push: { subscribers: { channel: mychannelid } } }
			).then((result) => {
				res.status(200).send(result);
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'internal server error' });
	}
});

module.exports = router;
