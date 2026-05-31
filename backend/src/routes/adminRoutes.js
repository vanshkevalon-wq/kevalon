const express = require('express');
const Application = require('../models/Application');
const ContactMessage = require('../models/ContactMessage');
const Page = require('../models/Page');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', requireAuth, async (req, res, next) => {
  try {
    const [applications, contacts, pages] = await Promise.all([
      Application.countDocuments(),
      ContactMessage.countDocuments(),
      Page.countDocuments(),
    ]);

    return res.json({
      data: {
        applications,
        contacts,
        pages,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
