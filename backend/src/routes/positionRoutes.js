const express = require('express');
const Position = require('../models/Position');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function normalizeListField(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return undefined;
}

function normalizeBooleanField(value) {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

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
      title: typeof title === 'string' ? title.trim() : title,
      type,
      category: typeof category === 'string' ? category.trim() : category,
      desc: typeof desc === 'string' ? desc.trim() : desc,
      skills: normalizeListField(skills) || [],
      responsibilities: normalizeListField(responsibilities) || [],
      exp: typeof exp === 'string' ? exp.trim() : exp,
      location: typeof location === 'string' ? location.trim() : location,
      isActive: normalizeBooleanField(isActive) ?? true,
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
    const updates = {};

    if (title !== undefined) updates.title = typeof title === 'string' ? title.trim() : title;
    if (type !== undefined) updates.type = type;
    if (category !== undefined) updates.category = typeof category === 'string' ? category.trim() : category;
    if (desc !== undefined) updates.desc = typeof desc === 'string' ? desc.trim() : desc;
    if (skills !== undefined) updates.skills = normalizeListField(skills) || [];
    if (responsibilities !== undefined) updates.responsibilities = normalizeListField(responsibilities) || [];
    if (exp !== undefined) updates.exp = typeof exp === 'string' ? exp.trim() : exp;
    if (location !== undefined) updates.location = typeof location === 'string' ? location.trim() : location;

    const normalizedIsActive = normalizeBooleanField(isActive);
    if (normalizedIsActive !== undefined) {
      updates.isActive = normalizedIsActive;
    }

    const updated = await Position.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
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
    const deleted = await Position.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Position not found' });
    return res.json({ message: 'Position deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
