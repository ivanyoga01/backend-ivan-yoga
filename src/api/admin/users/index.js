const router = require('express').Router();
const pagination = require('../../../middlewares/pagination');
const { list, detail, create } = require('./controller');

router.get('/users', pagination, list);
router.get('/users/:id', detail);
router.post('/users', create);

module.exports = router;
