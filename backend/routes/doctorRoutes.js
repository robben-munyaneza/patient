const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

// Admin doctor routes (only accessible to Admins)
router.post('/', verifyToken, allowRoles('Admin'), doctorController.createDoctor);
router.get('/', verifyToken, allowRoles('Admin'), doctorController.getDoctors);
router.put('/:id', verifyToken, allowRoles('Admin'), doctorController.updateDoctor);
router.delete('/:id', verifyToken, allowRoles('Admin'), doctorController.deleteDoctor);

module.exports = router;
