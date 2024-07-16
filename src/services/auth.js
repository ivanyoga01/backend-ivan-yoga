const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../repository/users');
const config = require('../../config');

exports.comparePassword = function (password, savedPassword) {
  // use bcrypt
  return bcrypt.compare(password, savedPassword);
};

exports.generateToken = async function (userId, login = true) {
  const res = await User.findOne({
    where: {
      id: userId,
    },
  });

  const payload = {
    id: res.id,
    firstName: res.firstName,
    lastName: res.lastName,
    status: res.status,
    role: res.role,
  };
  let refreshToken;
  if (login)
    refreshToken = jwt.sign(payload, config.appConfig.refreshTokenSecret, {
      expiresIn: '24h',
    });
  const token = jwt.sign(payload, config.appConfig.secret, {
    expiresIn: '3h',
  });
  return {
    token,
    refreshToken,
  };
};
