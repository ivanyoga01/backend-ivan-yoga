const buildResponse = (status, data, message, meta = {}) => {
  if(!data) data ={};
  return {
    status,
    message,
    data,
    meta,
  };
};

module.exports = (req, res, next) => {
  res.API = {
    success: (data, message = 'OK', code = 200) =>
      res.status(code).json(buildResponse(true, data, message)),
    // error function is send the exception to error handling middleware
    error: (message, code, meta = {}) =>
      res.status(code).json(buildResponse(false, undefined, message, meta)),
    buildResponse: (code, status, message, data, meta) =>
      res.status(code).json(buildResponse(status, data, message, meta)),
  };
  next();
};
