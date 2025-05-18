const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createDoctor } = require('../controllers/userController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

// Public routes for registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (only accessible for Admins)
router.post('/create-doctor', verifyToken, allowRoles('Admin'), createDoctor);
router.get('/users', verifyToken, allowRoles('Admin'), (req, res) => {
  // Logic to get all users (for Admins only)
});

module.exports = router;