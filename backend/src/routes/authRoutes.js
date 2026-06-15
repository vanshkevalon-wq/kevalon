const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const AdminUser = require('../models/AdminUser');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(String(password), user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.uniqueId) {
      user.uniqueId = randomUUID();
      await user.save();
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, accountId: user.uniqueId, email: user.email, role: user.role },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await AdminUser.findById(req.user.sub).select('_id uniqueId email role');

    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    if (!user.uniqueId) {
      user.uniqueId = randomUUID();
      await user.save();
    }

    return res.json({
      user: {
        id: user._id,
        accountId: user.uniqueId,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.patch('/change-password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }

    const user = await AdminUser.findById(req.user.sub);

    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    const passwordMatches = await bcrypt.compare(String(currentPassword), user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from the current password' });
    }

    user.passwordHash = await bcrypt.hash(String(newPassword), 12);
    await user.save();

    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
