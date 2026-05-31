const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const pageRoutes = require('./routes/pageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const positionRoutes = require('./routes/positionRoutes');

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((item) => item.trim()) : true,
      credentials: true,
    }),
  );

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

  app.get('/', (req, res) => {
    res.json({
      name: 'Kevalon API',
      status: 'running',
      health: '/api/health',
      endpoints: {
        auth: '/api/auth',
        applications: '/api/applications',
        contact: '/api/contact',
        pages: '/api/pages',
        admin: '/api/admin',
      },
    });
  });

  app.get('/api', (req, res) => {
    res.json({ name: 'Kevalon API', status: 'running' });
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/positions', positionRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((error, req, res, next) => {
    if (error && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Resume file must be 10MB or smaller' });
    }

    if (error && error.message && error.message.includes('Only PDF, DOC, and DOCX files are allowed')) {
      return res.status(400).json({ message: error.message });
    }

    if (error && error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    if (error && error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate value found', details: error.keyValue });
    }

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };
