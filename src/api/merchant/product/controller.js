const { Op } = require('sequelize');
const UserRepository = require('../../../repository/users');
const { roles: userRole } = require('../../../constants/users');
const HttpError = require('../../../common/http-error');
const ProductRepository = require('../../../repository/product');
const TransactionRepository = require('../../../repository/transaction');

async function list(req, res) {
  // pagination and query
  const { offset, limit, page, pagesize } = req.pagination;
  const { q: searchQuery } = req.query;

  // query option
  const queryOptions = {
    where: {
      merchantId: req.auth.id,
    },
    order: [['updatedAt', 'DESC']],
    nest: true,
    raw: true,
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
    const data = await ProductRepository.list(queryOptions, offset, limit);

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

  const result = await ProductRepository.findOne({
    where: {
      id,
    },
  });

  // return 404 if user with req.params.id not found
  if (!result) return next(new HttpError('Product not found', 404));

  return res.API.success(result);
}

async function create(req, res, next) {
  const data = req.body;

  try {
    const result = await ProductRepository.create(data);
    return res.API.success(result);
  } catch (error) {
    return next(new HttpError(`Error Create Product: ${error}`, 404));
  }
}

async function updateProduct(req, res, next) {
  const id = req.params.id;
  const data = req.body;

  const product = await ProductRepository.findOne({
    where: {
      id,
    },
  });

  if (!product) return next(new HttpError('Product not found', 404));

  const result = await ProductRepository.updateById(id, data);

  return res.API.success();
}

async function deleteProduct(req, res, next) {
  const id = req.params.id;

  const result = await ProductRepository.findOne({
    where: {
      id,
    },
  });

  if (!result) return next(new HttpError('Product not found', 404));

  await ProductRepository.deleteById(id);

  return res.API.success();
}

async function getSoldProduct(req, res, next) {
  const merchantId = req.auth.id;
  const { offset, limit, page, pagesize } = req.pagination;
  const { q: searchQuery } = req.query;

  // query option
  const queryOptions = {
    where: {
      merchantId,
    },
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
          {
            association: 'client',
            required: true,
          },
        ],
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
async function detailTransaction(req, res, next) {
  const id = req.params.id;

  const result = await TransactionRepository.findOne({
    where: {
      id,
    },
    include: [
      {
        association: 'product',
      },
      {
        association: 'client',
      },
    ],
  });

  // return 404 if user with req.params.id not found
  if (!result) return next(new HttpError('Transaction not found', 404));

  return res.API.success(result);
}

module.exports = {
  list,
  detail,
  create,
  updateProduct,
  deleteProduct,
  getSoldProduct,
  detailTransaction,
};
