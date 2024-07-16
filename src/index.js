/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = process.env.PORT || 5000;
const server = app.listen(port);

server.on('listening', () =>
  logger.info('application started on port : ' + port)
);
