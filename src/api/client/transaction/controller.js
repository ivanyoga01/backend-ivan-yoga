const { Op } = require('sequelize');
const { rules } = require('../../../constants/transaction');
const HttpError = require('../../../common/http-error');
const ProductRepository = require('../../../repository/product');
const TransactionRepository = require('../../../repository/transaction');

async function list(req, res) {
  const clientId = req.auth.id;
  const { offset, limit, page, pagesize } = req.pagination;
  const { q: searchQuery } = req.query;

  // query option
  const queryOptions = {
    where: {},
  };

  // pencarian
  const searchableFields = ['name'];
  if (searchQuery) {
    queryOptions.where[Op.or] = searchableFields.map((field) => {
      let searchQueryItem = {};
      searchQueryItem[field] = { [Op.like]: `%${searchQuery}%` };

      return searchQueryItem;
    });
  }

  try {
    const data = await TransactionRepository.list(
      {
        include: [
          {
            association: 'product',
            ...queryOptions,
            required: true,
          },
        ],
        where: {
          clientId,
        },
        order: [['createdAt', 'DESC']],
        nest: true,
        raw: true,
      },
      offset,
      limit
    );

    const result = data.rows;

    return res.API.buildResponse(200, true, 'OK', result, {
      total: data.count,
      page,
      pagesize,
    });
  } catch (error) {
    return res.API.error(error.message, 500);
  }
}

async function detail(req, res, next) {
  const id = req.params.id;

  const result = await TransactionRepository.findOne({
    where: {
      id,
    },
    include: [
      {
        association: 'product',
      },
    ],
  });

  // return 404 if user with req.params.id not found
  if (!result) return next(new HttpError('Transaction not found', 404));

  return res.API.success(result);
}

async function createTransaction(req, res, next) {
  const clientId = req.auth.id;
  const data = req.body;
  const qty = data.qty;

  const product = await ProductRepository.findOne({
    where: {
      id: data.productId,
    },
  });

  if (!product) {
    return next(new HttpError('Product not found', 404));
  }

  if (qty > product.stock) {
    return next(new HttpError('Stock Not Enough', 404));
  }

  data.subTotal = qty * product.price;

  if (data.subTotal >= rules.GRATIS_ONGKIR) {
    data.gratisOngkir = 1;
  }
  if (data.subTotal >= rules.DISKON) {
    data.discount = (10 / 100) * data.subTotal;
    data.total = data.subTotal - data.discount;
  } else data.total = data.subTotal;

  data.clientId = clientId;

  const result = await TransactionRepository.create(data);

  if (result) {
    const newStock = parseInt(product.stock - qty);
    const updateProduct = await ProductRepository.updateById(product.id, {
      stock: newStock,
    });
  }

  return res.API.success(result);
}

module.exports = {
  list,
  detail,
  createTransaction,
};
