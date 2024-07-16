const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const responseFormat = require('./middlewares/response-format');
const requestLogger = require('./middlewares/request-log');
const errorHandling = require('./middlewares/error-handling');
const router = require('./api');

const db = require('./models');
const notFoundMiddleware = require('./middlewares/not-found');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger());
app.use(responseFormat);
app.use('/', router);
app.use(notFoundMiddleware);
app.use(errorHandling);

module.exports = app;
