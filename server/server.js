const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json({ extended: false }));

connectDB();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/channels', require('./routes/api/channels'));
app.use('/api/subscribe', require('./routes/api/subscribe'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server started on PORT ${PORT}`);
});
