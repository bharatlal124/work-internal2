const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if environment variables are set
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
      throw new Error('Admin credentials not configured');
    }

    // Verify email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token
    const payload = {
      admin: {
        email: process.env.ADMIN_EMAIL
      }
    };
    
    const token = jwt.sign(
      payload,
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set cookie and send response
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });
    
    res.json({ 
      success: true,
      token,
      admin: {
        email: process.env.ADMIN_EMAIL
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      error: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;