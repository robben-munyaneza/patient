const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, role, email } = req.body;

    // Validate input data
    if (!username || !password || !role || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Prevent Admin role for public registration
    if (role === 'Admin') {
      return res.status(403).json({ message: 'Cannot register as Admin' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
      email
    });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data
    if (!username || !password) {
      return res.status(400).json({ message: 'Both username and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create doctor user (Admin only)
exports.createDoctor = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input data
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create doctor user
    const newDoctor = await User.create({
      username,
      password: hashedPassword,
      role: 'Doctor',
      email,
    });

    res.status(201).json({
      message: 'Doctor user created successfully',
      user: { id: newDoctor.id, username: newDoctor.username, role: newDoctor.role },
    });
  } catch (error) {
    console.error('Error creating doctor user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};