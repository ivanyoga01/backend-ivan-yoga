const router = require('express').Router();
const pagination = require('../../../middlewares/pagination');
const { list, detail, createTransaction } = require('./controller');

router.get('/transaction', pagination, list);
router.get('/transaction/:id', detail);
router.post('/transaction', createTransaction);

module.exports = router;
