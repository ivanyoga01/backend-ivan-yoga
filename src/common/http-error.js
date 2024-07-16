class HttpError extends Error{
  constructor(message, code= 500, data = undefined) {
    super(message);
    this.code=code;
    this.isMyHttpError = true;
    this.data = data;
  }
}

module.exports = HttpError;
