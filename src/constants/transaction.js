exports.rules = {
  GRATIS_ONGKIR: 15000,
  DISKON: 50000,
  TOTAL_DISKON: 10,
};

exports.transactionConstant = (category) => {
  return Object.keys(category).map((key) => category[key]);
};
