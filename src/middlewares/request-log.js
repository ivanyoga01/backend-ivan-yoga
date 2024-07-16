const morgan = require('morgan');
const logger = require('../logger');

const defaultFormat = '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';
const logWriter = {
  write: (message) => {
    logger.info(message);

  },
};
/**
 * Create request logger
 * @param [format] {string}
 * @return {Function} middleware
 */
module.exports = (format) => morgan(format || defaultFormat, {
  stream: logWriter
});
