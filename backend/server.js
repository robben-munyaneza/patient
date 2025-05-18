const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');

// Models
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Report = require('./models/Report');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// After other requires
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const reportRoutes = require('./routes/reportRoutes');


// Routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/reports', reportRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync(); // Sync all models
  })
  .then(() => console.log('Models synced'))
  .catch((err) => console.error('Error connecting to database:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
