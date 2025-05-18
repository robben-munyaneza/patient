const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Patient = sequelize.define('Patient', {
  name: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  sex: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false }
});

module.exports = Patient;
