const { Op } = require('sequelize');
const { Transaction } = require('../models');

const TransactionRepository = {
  async findOne(queryOptions = {}) {
    const result = await Transaction.findOne({
      ...queryOptions,
    });
    return result;
  },

  async create(data) {
    const result = await Transaction.create(data);
    return result.get({ plain: true });
  },

  async findAll(queryOptions = {}) {
    const result = await Transaction.findAll({
      ...queryOptions,
    });
    return result;
  },

  async updateById(TransactionId, data, queryOptions = {}) {
    return await Transaction.update(data, {
      where: {
        id: TransactionId,
      },
      ...queryOptions,
    });
  },

  async list(options = {}, offset, limit = 10) {
    const result = await Transaction.findAndCountAll({
      ...options,
      offset: offset,
      limit: limit,
    });
    return result;
  },

  async deleteById(id, options = {}) {
    const result = await Transaction.destroy({
      where: { id: id },
      ...options,
    });
    return result;
  },
};

module.exports = TransactionRepository;
