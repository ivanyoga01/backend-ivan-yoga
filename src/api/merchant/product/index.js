const router = require('express').Router();
const pagination = require('../../../middlewares/pagination');
const {
  list,
  detail,
  create,
  updateProduct,
  deleteProduct,
  getSoldProduct,
  detailTransaction,
} = require('./controller');

router.get('/product', pagination, list);
router.get('/product/:id', detail);
router.post('/product', create);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/transaction', pagination, getSoldProduct);
router.get('/transaction/:id', detailTransaction);

module.exports = router;
