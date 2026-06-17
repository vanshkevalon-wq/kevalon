const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const pageRoutes = require('./routes/pageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const portfolioLeadRoutes = require('./routes/portfolioLeadRoutes');
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

  /* ── Email diagnostics (safe — no real email sent) ── */
  app.get('/api/email-status', (req, res) => {
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    const configured = !!(user && pass &&
      user !== 'your_gmail@gmail.com' &&
      pass !== 'your_app_password_here');
    res.json({
      configured,
      SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
      SMTP_PORT: process.env.SMTP_PORT || '587',
      SMTP_USER: user ? user.replace(/(.{2}).*(@.*)/, '$1***$2') : 'NOT SET',
      SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || 'NOT SET',
    });
  });

  /* ── Send a real test email (GET for easy browser testing) ── */
  app.get('/api/email-test', async (req, res) => {
    const nodemailer = require('nodemailer');
    const to = req.query.to || process.env.SMTP_USER;
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.verify();
      const info = await transporter.sendMail({
        from: `"Kevalon Technology" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Kevalon Email Test',
        html: '<p>Email system is working correctly on this server.</p>',
      });
      res.json({ success: true, messageId: info.messageId, to });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/positions', positionRoutes);
  app.use('/api/portfolio-leads', portfolioLeadRoutes);

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
