const {DataTypes} = require("sequelize");
const sequelize = require("../config/config");

const Cart = sequelize.define("Cart",{
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
});

module.exports = Cart;