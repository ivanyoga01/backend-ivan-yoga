'use strict';
const { UUIDV4 } = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
      Transaction.belongsTo(models.Users, {
        foreignKey: 'clientId',
        as: 'client',
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      gratisOngkir: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );

  return Transaction;
};
