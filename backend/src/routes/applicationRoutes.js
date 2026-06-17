const express = require('express');
const { randomUUID } = require('crypto');
const Application = require('../models/Application');
const { requireAuth } = require('../middleware/auth');
const { uploadResume } = require('../config/upload');
const {
  sendShortlistedEmail,
  sendRound1ResultEmail,
  sendRound2ScheduledEmail,
  sendRound2ResultEmail,
} = require('../utils/mailer');

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

/**
 * POST /api/applications/admin/:id/interview
 * Body: { action, date?, time?, result? }
 *
 * action values:
 *   'shortlist'          – shortlist and schedule Round 1 (date + time required)
 *   'round1_result'      – set Round 1 result: result = 'selected' | 'rejected'
 *   'schedule_round2'    – schedule Round 2 (date + time required, result ignored)
 *   'round2_result'      – set Round 2 / final result: result = 'hired' | 'not_selected'
 */
router.post('/admin/:id/interview', requireAuth, async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const { action, date, time, result } = req.body;
    const name = `${application.firstName} ${application.lastName}`;
    const { email, role } = application;
    const emailEnabled = !!(process.env.SMTP_USER && process.env.SMTP_PASS);

    if (action === 'shortlist') {
      if (!date || !time) {
        return res.status(400).json({ message: 'Date and time are required to schedule Round 1.' });
      }
      application.status = 'shortlisted';
      application.round1Status = 'scheduled';
      application.round1Date = date;
      application.round1Time = time;
      application.round1NotifiedAt = new Date();
      await application.save();

      if (emailEnabled) {
        try {
          await sendShortlistedEmail({ to: email, name, role, date, time });
        } catch (mailErr) {
          console.error('Email send failed (shortlist):', mailErr.message);
        }
      }
      return res.json({ message: 'Applicant shortlisted and Round 1 interview scheduled. Email sent.', data: application });
    }

    if (action === 'round1_result') {
      if (!result || !['selected', 'rejected'].includes(result)) {
        return res.status(400).json({ message: "result must be 'selected' or 'rejected'." });
      }
      application.round1Status = result;
      if (result === 'rejected') {
        application.status = 'rejected';
        application.finalStatus = 'not_selected';
      } else {
        application.status = 'shortlisted'; // still in pipeline
      }
      await application.save();

      if (emailEnabled) {
        try {
          await sendRound1ResultEmail({ to: email, name, role, result });
        } catch (mailErr) {
          console.error('Email send failed (round1_result):', mailErr.message);
        }
      }
      return res.json({ message: `Round 1 result saved (${result}). Email sent.`, data: application });
    }

    if (action === 'schedule_round2') {
      if (!date || !time) {
        return res.status(400).json({ message: 'Date and time are required to schedule Round 2.' });
      }
      if (application.round1Status !== 'selected') {
        return res.status(400).json({ message: 'Applicant must have passed Round 1 before scheduling Round 2.' });
      }
      application.round2Status = 'scheduled';
      application.round2Date = date;
      application.round2Time = time;
      application.round2NotifiedAt = new Date();
      await application.save();

      if (emailEnabled) {
        try {
          await sendRound2ScheduledEmail({ to: email, name, role, date, time });
        } catch (mailErr) {
          console.error('Email send failed (schedule_round2):', mailErr.message);
        }
      }
      return res.json({ message: 'Round 2 interview scheduled. Email sent.', data: application });
    }

    if (action === 'round2_result') {
      if (!result || !['hired', 'not_selected'].includes(result)) {
        return res.status(400).json({ message: "result must be 'hired' or 'not_selected'." });
      }
      application.round2Status = result === 'hired' ? 'selected' : 'rejected';
      application.status = result === 'hired' ? 'hired' : 'rejected';
      application.finalStatus = result;
      await application.save();

      if (emailEnabled) {
        try {
          await sendRound2ResultEmail({ to: email, name, role, result });
        } catch (mailErr) {
          console.error('Email send failed (round2_result):', mailErr.message);
        }
      }
      return res.json({ message: `Final result saved (${result}). Email sent.`, data: application });
    }

    return res.status(400).json({ message: 'Invalid action. Must be one of: shortlist, round1_result, schedule_round2, round2_result.' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
