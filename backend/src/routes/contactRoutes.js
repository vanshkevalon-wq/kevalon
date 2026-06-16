const express = require('express');
const { randomUUID } = require('crypto');
const ContactMessage = require('../models/ContactMessage');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const contactMessage = await ContactMessage.create({
      uniqueId: randomUUID(),
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone || '',
      message: req.body.message,
    });

    return res.status(201).json({
      message: 'Contact message submitted successfully',
      data: contactMessage,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/admin', requireAuth, async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json({ data: messages });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
