const HttpError = require('../common/http-error');
module.exports = (req, res, next) => {
  const e = new HttpError('Not Found', 404);
  next(e);
};
