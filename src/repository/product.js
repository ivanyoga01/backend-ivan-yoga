const { Op } = require('sequelize');
const { Product } = require('../models');

const ProductRepository = {
  async findOne(queryOptions = {}) {
    const result = await Product.findOne({
      raw: true,
      ...queryOptions,
    });
    return result;
  },

  async create(data) {
    const result = await Product.create(data);
    return result.get({ plain: true });
  },

  async findAll(queryOptions = {}) {
    const result = await Product.findAll({
      ...queryOptions,
    });
    return result;
  },

  async updateById(productId, data, queryOptions = {}) {
    return await Product.update(data, {
      where: {
        id: productId,
      },
      ...queryOptions,
    });
  },

  async list(options = {}, offset, limit = 10) {
    const result = await Product.findAndCountAll({
      ...options,
      offset: offset,
      limit: limit,
    });
    return result;
  },

  async deleteById(id, options = {}) {
    const result = await Product.destroy({
      where: { id: id },
      ...options,
    });
    return result;
  },
};

module.exports = ProductRepository;
