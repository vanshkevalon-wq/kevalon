const express = require('express');
const { randomUUID } = require('crypto');
const Application = require('../models/Application');
const { requireAuth } = require('../middleware/auth');
const { uploadResume } = require('../config/upload');

const router = express.Router();

router.post('/', uploadResume.single('resume'), async (req, res, next) => {
  try {
    const resumeFileName = req.file ? req.file.originalname : '';
    const resumeFilePath = req.file ? req.file.path : '';
    const resumeFileUrl = req.file ? `/uploads/resumes/${req.file.filename}` : '';

    const application = await Application.create({
      uniqueId: randomUUID(),
      enrollmentNumber: `APP-${Date.now()}-${randomUUID().slice(0, 8)}`,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedInProfile: req.body.linkedInProfile || '',
      portfolioUrl: req.body.portfolioUrl || '',
      resumeFileName,
      resumeFilePath,
      resumeFileUrl,
      role: req.body.role,
      positionId: req.body.positionId || null,
    });

    return res.status(201).json({
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/admin', requireAuth, async (req, res, next) => {
  try {
    const applications = await Application.find().populate('positionId', 'title category').sort({ createdAt: -1 });
    return res.json({ data: applications });
  } catch (error) {
    return next(error);
  }
});

router.patch('/admin/:id/status', requireAuth, async (req, res, next) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.json({ message: 'Application updated', data: updated });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
