const express = require('express');

const middlewareNotFound = require('./middlewares/notFound');
const middlewareError = require('./middlewares/error');
const { generateToken } = require('./middlewares/auth');

const elastic = require('elasticsearch');
const bodyParser = require('body-parser').json();

//Se crea una instancia del cliente de elasticsearch,
//que se conecta a localhost en el puerto 9200
const elasticClient = elastic.Client({
	host: 'localhost:9200',
});

const morgan = require('morgan');

const modulesRoutes = require('./modules/routes');
const app = express();

const apiRoutes = express.Router();

// App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan(':date :url :method :status body: :body - :response-time ms'));
	morgan.token('body', (req) => JSON.stringify(req.body));
}

app.post('/getToken', generateToken);

// Dynamic routes
modulesRoutes.forEach((route) => {
	const [routeName] = Object.keys(route);
	apiRoutes.use(`/${routeName}`, route[routeName]);
});

app.use('/v1/api', apiRoutes);

app.use(middlewareNotFound);
app.use(middlewareError);

module.exports = app;
