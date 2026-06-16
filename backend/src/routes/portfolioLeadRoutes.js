const express = require('express');
const PortfolioLead = require('../models/PortfolioLead');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/* ── Public: submit a lead ── */
router.post('/', async (req, res, next) => {
  try {
    const { projectTitle, projectSlug, email, phone } = req.body;

    if (!projectTitle || !projectSlug) {
      return res.status(400).json({ message: 'Project info is required.' });
    }
    if (!email && !phone) {
      return res.status(400).json({ message: 'Please provide an email or phone number.' });
    }

    const lead = await PortfolioLead.create({ projectTitle, projectSlug, email, phone });
    return res.status(201).json({ message: 'Lead saved.', data: lead });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: list all leads ── */
router.get('/admin', requireAuth, async (req, res, next) => {
  try {
    const leads = await PortfolioLead.find().sort({ createdAt: -1 });
    return res.json({ data: leads });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: update lead status ── */
router.patch('/admin/:id/status', requireAuth, async (req, res, next) => {
  try {
    const { status } = req.body;
    const lead = await PortfolioLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    return res.json({ message: 'Status updated.', data: lead });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: delete a lead ── */
router.delete('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    await PortfolioLead.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Lead deleted.' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
