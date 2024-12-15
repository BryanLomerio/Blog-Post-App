const db = require('../models/db');
const bcrypt = require('bcryptjs');

// Register a new user
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); 
  const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
  return result;
};

// Find a user by email
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.execute(query, [email]);
  return rows[0]; 
};

// Validate user credentials (check password)
const validateUserPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { createUser, getUserByEmail, validateUserPassword };
