const HttpError = require('../../common/http-error');
const logger = require('../../logger');
const UserRepository = require('../../repository/users');
const { comparePassword, generateToken } = require('../../services/auth');
const { loginReponse } = require('./schema/auth');

async function login(req, res, next) {
  const data = req.body;
  const userData = await UserRepository.findOne({
    where: {
      email: data.email,
    },
  });
  if (!userData) {
    return next(new HttpError('User not found', 400));
  }

  const comparedPassword = await comparePassword(
    data.password,
    userData.password
  );
  if (!comparedPassword) {
    return next(new HttpError('Password is wrong', 400));
  }
  const jwt = await generateToken(userData.id);
  const response = loginReponse(userData);
  delete userData.password;
  return res.API.success({
    ...response,
    ...jwt,
  });
}

module.exports = {
  login,
};
