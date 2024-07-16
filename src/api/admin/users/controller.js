const { Op } = require('sequelize');
const UserRepository = require('../../../repository/users');
const { roles: userRole } = require('../../../constants/users');
const HttpError = require('../../../common/http-error');

async function list(req, res) {
  // pagination and query
  const { offset, limit, page, pagesize } = req.pagination;
  const { q: searchQuery } = req.query;

  // query option
  const queryOptions = {
    where: {
      role: [userRole.CLIENT, userRole.MERCHANT],
    },
    attributes: ['id', 'firstName', 'lastName', 'email'],
    order: [['updatedAt', 'DESC']],
    nest: true,
    raw: true,
  };

  // pencarian
  const searchableFields = ['firstName', 'lastName'];
  if (searchQuery) {
    queryOptions.where[Op.or] = searchableFields.map((field) => {
      let searchQueryItem = {};
      searchQueryItem[field] = { [Op.like]: `%${searchQuery}%` };

      return searchQueryItem;
    });
  }

  try {
    const data = await UserRepository.list(queryOptions, offset, limit);

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

  const users = await UserRepository.findOne({
    where: {
      id,
    },
  });

  // return 404 if user with req.params.id not found
  if (!users) return next(new HttpError('User not found', 404));

  return res.API.success(users);
}

async function create(req, res, next) {
  const data = req.body;


  try {
    const result = await UserRepository.create(data);
    return res.API.success(result);
  } catch (error) {
    return next(new HttpError(`Error Create Users: ${error}`, 404));
  }

}

module.exports = {
  list,
  detail,
  create,
};
