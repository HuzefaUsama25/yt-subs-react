const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/channels', require('./routes/api/channels'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server started on PORT ${PORT}`);
});
