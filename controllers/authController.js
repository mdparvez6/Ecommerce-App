// Importing required modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup function for registering new users
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creating a new user with hashed password
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  res.json({ message: "User created Successfully", user });
};

// Login function for user authentication
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  // If user is not found, return a 400 status error for invalid credentials
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If the password is not valid, return a 400 status error for invalid credentials
  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ message: "Login Successful", token });
};

