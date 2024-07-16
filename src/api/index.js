const router = require('express').Router();
const defaultResponse = require('../common/default-response');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const merchantRouter = require('./merchant');
const clientRouter = require('./client');

router.get('/', defaultResponse);
router.use('/auth', authRouter);

router.use('/admin', adminRouter);
router.use('/merchant', merchantRouter);
router.use('/client', clientRouter);

module.exports = router;
