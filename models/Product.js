const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.FLOAT,
  discount: DataTypes.FLOAT,
  sellerId: DataTypes.INTEGER,
});

module.exports = Product;
