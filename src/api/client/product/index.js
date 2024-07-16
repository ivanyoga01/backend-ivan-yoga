const router = require('express').Router();
const pagination = require('../../../middlewares/pagination');
const {
  list,
  detail,
} = require('./controller');

router.get('/product', pagination, list);
router.get('/product/:id', detail);

module.exports = router;
