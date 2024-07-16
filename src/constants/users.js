exports.roles = {
  MERCHANT: 'merchant',
  CLIENT: 'client',
  ADMIN: 'admin',
};

exports.usersConstant = (category) => {
  return Object.keys(category).map((key) => category[key]);
};
