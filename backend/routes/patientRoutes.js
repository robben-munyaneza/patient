const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

// Patient CRUD Routes (Only Doctors can manage patients, Admin can view all)
router.post('/', verifyToken, allowRoles('Doctor'), patientController.createPatient);
router.get('/', verifyToken, allowRoles('Doctor', 'Admin'), patientController.getAllPatients);
router.get('/:id', verifyToken, allowRoles('Doctor', 'Admin'), patientController.getPatientById);
router.put('/:id', verifyToken, allowRoles('Doctor'), patientController.updatePatient);
router.delete('/:id', verifyToken, allowRoles('Doctor'), patientController.deletePatient);

module.exports = router;
