const express = require("express");
const authController = require("../controllers/authController");
const sellerController = require("../controllers/sellerController");
const buyerController = require("../controllers/buyerController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router(); 

// Authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Seller routes 
router.post("/seller/product", authenticate, sellerController.addProduct);
router.put(
  "/seller/product/:productId",
  authenticate,
  sellerController.editProduct
);
router.delete(
  "/seller/product/:productId",
  authenticate,
  sellerController.deleteProduct
);

// Buyer routes
router.get("/buyer/search", authenticate, buyerController.searchProducts);
router.post("/buyer/cart", authenticate, buyerController.addToCart);
router.delete("/buyer/cart", authenticate, buyerController.removeFromCart);

module.exports = router;
