const { roles } = require('../../constants/users');
const {
  decodeToken,
  loginCheck,
  checkRoles,
} = require('../../middlewares/authentication');
const router = require('express').Router();
const productRouter = require('./product');

router.use(decodeToken, loginCheck, checkRoles(roles.MERCHANT));
router.use(productRouter);

module.exports = router;
