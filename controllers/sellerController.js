const {
  validateProduct,
  validateProductId,
} = require("../middlewares/validationMiddleware");

const Product = require("../models/Product");

// Function to allow the seller to add a product

exports.addProduct = [
  validateProduct, // Validation middleware
  async (req, res) => {
    try {
      const { name, category, description, price, discount } = req.body;
      const sellerId = req.user.id;

      // Create a new product entry in the database
      const product = await Product.create({
        name,
        category,
        description,
        price,
        discount,
        sellerId,
      });

      res.json({ message: "Product added", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

// Function to allow the seller to edit an existing product

exports.editProduct = [
  validateProductId, // Validate productId param
  validateProduct, // Validation middleware
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, category, description, price, discount } = req.body;

      // Find the product by its ID and seller's ID
      const product = await Product.findOne({
        where: { id: productId, sellerId: req.user.id },
      });

      if (!product) return res.status(400).json({ error: "Product not found" });

      // Update the product details
      await product.update({ name, category, description, price, discount });

      res.json({ message: "Product Updated", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

// Function to allow the seller to delete a product

exports.deleteProduct = [
  validateProductId, // Validate productId param
  async (req, res) => {
    try {
      const { productId } = req.params;

      // Find the product by its ID and seller's ID
      const product = await Product.findOne({
        where: { id: productId, sellerId: req.user.id },
      });

      if (!product) return res.status(400).json({ error: "Product not found" });

      // Delete the product
      await product.destroy();

      res.json({ message: "Product Deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];
