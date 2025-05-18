const Report = require('../models/Report');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Create a report
exports.createReport = async (req, res) => {
  try {
    const { patientId, doctorId, date, findings } = req.body;

    const report = await Report.create({ patientId, doctorId, date, findings });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report', error: error.message });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        { model: Patient, attributes: ['name'] },
        { model: Doctor, attributes: ['name', 'specialization'] }
      ]
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reports', error: error.message });
  }
};

// Get report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: [
        { model: Patient, attributes: ['name'] },
        { model: Doctor, attributes: ['name', 'specialization'] }
      ]
    });
    if (!report) return res.status(404).json({ message: 'Report not found' });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get report', error: error.message });
  }
};

// Update report
exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    await report.update(req.body);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update report', error: error.message });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    await report.destroy();
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete report', error: error.message });
  }
};
