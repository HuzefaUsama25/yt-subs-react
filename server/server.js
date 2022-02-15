const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use('/api/users', require('./routes/api/users'));

app.get('/api', (req, res) => {
	res.send('running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server started on PORT ${PORT}`);
});
