const { Op } = require('sequelize');
const { Users } = require('../models');

const UserRepository = {
  async findOne(queryOptions = {}) {
    const excludeField = ['createdAt', 'updatedAt'];
    const result = await Users.findOne({
      attributes: {
        exclude: excludeField,
      },
      raw: true,
      ...queryOptions,
    });
    return result;
  },

  async findByPk(userId, queryOptions) {
    const result = await Users.findByPk(userId, {
      attributes: {
        exclude: ['password'],
      },
      ...queryOptions,
    });
    return result;
  },

  async create(data) {
    const result = await Users.create(data);
    return result.get({ plain: true });
  },

  async findAll(queryOptions = {}) {
    const result = await Users.findAll({
      ...queryOptions,
    });
    return result;
  },

  async updateById(userId, data, queryOptions = {}) {
    return await Users.update(data, {
      where: {
        id: userId,
      },
      ...queryOptions,
    });
  },

  async list(options = {}, offset, limit = 10) {
    const result = await Users.findAndCountAll({
      ...options,
      offset: offset,
      limit: limit,
    });
    return result;
  },

  async deleteById(id, options = {}) {
    const result = await Users.destroy({
      where: { id: id },
      ...options,
    });
    return result;
  },
};

module.exports = UserRepository;
