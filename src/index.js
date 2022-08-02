require('dotenv').config();
const { PORT } = require('./config');

const app = require('./server');

app.listen(PORT, () => {
	console.log(`server is running https://localhost:${PORT}`);
});
