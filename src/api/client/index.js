const { roles } = require('../../constants/users');
const {
  decodeToken,
  loginCheck,
  checkRoles,
} = require('../../middlewares/authentication');
const router = require('express').Router();
const productRouter = require('./product');
const transactionRouter = require('./transaction');

router.use(decodeToken, loginCheck, checkRoles(roles.CLIENT));
router.use(productRouter);
router.use(transactionRouter);

module.exports = router;
