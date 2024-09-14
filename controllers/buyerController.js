const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Function to search for products by name or category
exports.searchProducts = async (req,res)=>{
    const {name, category} = req.body;
    const where={};
    if(!name) where.name=name;
    if(category) where.category=category;
    
    // Finding all products that match the search conditions
    const products = await Product.findAll({where});
    res.json(products);
};

// Function to add a product to the buyer's cart
exports.addToCart = async (req,res) =>{
  const { productId } = req.body;
  const buyerId = req.user.id;

  // Creating a new cart item with the product ID and buyer ID
  const cartItem = await Cart.create({ productId, buyerId });
  res.json({ message: "Added to cart", cartItem });
};

// Function to remove a product from the buyer's cart
exports.removeFromCart = async (req,res) =>{
  const { productId } = req.body;
  const buyerId = req.user.id;

  // Finding the cart item that matches the product and buyer IDs
  const cartItem = await Cart.findOne({ where: { productId, buyerId } });

  if (!cartItem) return res.status(404).json({ error: "Product not in cart" });

  // Removing the cart item from the database
  await cartItem.destroy();
  res.json({ message: "Removed from cart" });
};




