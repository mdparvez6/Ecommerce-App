// middleware/validationMiddleware.js
const { body, param, validationResult } = require("express-validator");

// Validate and sanitize product data
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .escape(),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .escape(),
  body("description").trim().optional().isString().escape(),

  // Ensure price is a positive number
  body("price")
    .isDecimal()
    .withMessage("Price must be a valid number")
    .custom((value) => value > 0)
    .withMessage("Price must be a positive number"),

  // Ensure discount is a positive number and not greater than 100
  body("discount")
    .optional()
    .isDecimal()
    .withMessage("Discount must be a valid number")
    .custom((value) => value >= 0 && value <= 100)
    .withMessage("Discount must be between 0 and 100"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validate product ID param
const validateProductId = [
  param("productId").isInt().withMessage("Invalid Product ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


module.exports = { validateProduct, validateProductId };
