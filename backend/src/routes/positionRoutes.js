const express = require('express');
const Position = require('../models/Position');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/* ── Public: list active positions ── */
router.get('/', async (req, res, next) => {
  try {
    const positions = await Position.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json({ data: positions });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: list all positions (including inactive) ── */
router.get('/admin', requireAuth, async (req, res, next) => {
  try {
    const positions = await Position.find().sort({ createdAt: -1 });
    return res.json({ data: positions });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: create position ── */
router.post('/admin', requireAuth, async (req, res, next) => {
  try {
    const { title, type, category, desc, skills, responsibilities, exp, location, isActive } = req.body;
    const position = await Position.create({
      title, type, category, desc,
      skills:           Array.isArray(skills)           ? skills           : (skills || '').split(',').map(s => s.trim()).filter(Boolean),
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities || '').split(',').map(s => s.trim()).filter(Boolean),
      exp, location,
      isActive: isActive !== false,
    });
    return res.status(201).json({ message: 'Position created', data: position });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: update position ── */
router.patch('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const { title, type, category, desc, skills, responsibilities, exp, location, isActive } = req.body;
    const updated = await Position.findByIdAndUpdate(
      req.params.id,
      {
        title, type, category, desc,
        skills:           Array.isArray(skills)           ? skills           : (skills || '').split(',').map(s => s.trim()).filter(Boolean),
        responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities || '').split(',').map(s => s.trim()).filter(Boolean),
        exp, location, isActive,
      },
      { new: true },
    );
    if (!updated) return res.status(404).json({ message: 'Position not found' });
    return res.json({ message: 'Position updated', data: updated });
  } catch (err) {
    return next(err);
  }
});

/* ── Admin: delete position ── */
router.delete('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    await Position.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Position deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
