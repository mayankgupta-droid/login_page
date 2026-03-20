const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper for redirecting to message page
const redirectWithMessage = (res, message, status = 'info') => {
  return res.redirect(`/message.html?status=${status}&msg=${encodeURIComponent(message)}`);
};

// Routes

// 1. Signup Flow (Updated with Username)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || username.trim() === '') {
    return redirectWithMessage(res, 'Username is required', 'error');
  }

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return redirectWithMessage(res, 'Already registered', 'error');
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
      [username, email, password_hash]
    );

    redirectWithMessage(res, 'Successfully Registered', 'success');
  } catch (err) {
    console.error(err);
    redirectWithMessage(res, 'Server Error', 'error');
  }
});

// 2. Login Flow (Updated with Personalization)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return redirectWithMessage(res, 'Invalid email or password', 'error');
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (isMatch) {
      const welcomeMsg = `Welcome, ${user.username || 'User'}`;
      redirectWithMessage(res, welcomeMsg, 'success');
    } else {
      redirectWithMessage(res, 'Invalid email or password', 'error');
    }
  } catch (err) {
    console.error(err);
    redirectWithMessage(res, 'Server Error', 'error');
  }
});

// 3. Forgot Password Flow
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      res.redirect(`/reset.html?email=${encodeURIComponent(email)}`);
    } else {
      redirectWithMessage(res, 'Email not found', 'error');
    }
  } catch (err) {
    console.error(err);
    redirectWithMessage(res, 'Server Error', 'error');
  }
});

// 4. Reset Password Flow
app.post('/reset-password', async (req, res) => {
  const { email, new_password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(new_password, salt);

    await pool.query(
      'UPDATE users SET password_hash = $1 WHERE email = $2',
      [password_hash, email]
    );

    redirectWithMessage(res, 'Password updated successfully', 'success');
  } catch (err) {
    console.error(err);
    redirectWithMessage(res, 'Server Error', 'error');
  }
});

// Serve frontend for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
