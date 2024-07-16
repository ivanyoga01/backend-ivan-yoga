const { roles } = require('../../constants/users');
const {
  decodeToken,
  loginCheck,
  checkRoles,
} = require('../../middlewares/authentication');
const router = require('express').Router();
const userRouter = require('./users');

router.use(decodeToken, loginCheck, checkRoles(roles.ADMIN));
router.use(userRouter);

module.exports = router;