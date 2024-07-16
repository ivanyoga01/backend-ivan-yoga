const logger = require('../logger');
const HttpError = require('../common/http-error');

module.exports = (err, req, res, next) => {
  // clearing personal data
  if (req.headers.authorization) {
    req.headers.authorization = 'CENSORED';
  }
  const uid = req.auth ? req.auth.uid : undefined;
  if(req.body?.password){
    req.body.password= 'CENSORED';
  }
  let message,code, extras, meta;
  if (err instanceof HttpError) {
    message = err.message;
    code = err.code;
    meta = err.data;
  } else if (err.isAxiosError) {
    message = err.message;
    code = 500;
    extras = err.response ? err.response.data : null;
  } else if (typeof err.message === 'string') {
    message = err.message;
    code = 500;
  } else {
    message = 'Unknown Error';
    code = 500;
  }
  const logData = {
    message,
    code,
    url: req.path,
    method: req.method,
    body: req.body,
    param: req.params,
    query: req.query,
    header: req.headers,
    extras,
    uid,
    stack: err.stack
  };
  if (code >=500) {
    const e= new Error();
    logger.error(logData.message, logData);
  } else {
    logger.warn(logData.message, logData);
  }
  return res.API.error(message, code, meta);
};
