const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


/* API Routes */
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/application', applicationRoutes);

/* Frontend Folder Connection */
app.use(express.static(path.join(__dirname, '../frontend')));

/* Open index.html Initially */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(5000, () => {
  console.log('Server Running on http://localhost:5000');
});