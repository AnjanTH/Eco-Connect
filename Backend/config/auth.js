
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d', 
  });
};


const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; 
  }
};

module.exports = { generateToken, verifyToken };
