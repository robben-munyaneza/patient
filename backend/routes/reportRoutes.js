const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

// Report Routes
router.post('/', verifyToken, allowRoles('Doctor'), reportController.createReport);
router.get('/', verifyToken, allowRoles('Doctor', 'Admin'), reportController.getAllReports);
router.get('/:id', verifyToken, allowRoles('Doctor', 'Admin'), reportController.getReportById);
router.delete('/:id', verifyToken, allowRoles('Doctor'), reportController.deleteReport);

module.exports = router;
