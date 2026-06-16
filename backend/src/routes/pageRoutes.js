const express = require('express');
const { randomUUID } = require('crypto');
const Page = require('../models/Page');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/slug/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isPublished: true });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({ data: page });
  } catch (error) {
    return next(error);
  }
});

router.get('/admin/list', requireAuth, async (req, res, next) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });
    return res.json({ data: pages });
  } catch (error) {
    return next(error);
  }
});

router.post('/admin', requireAuth, async (req, res, next) => {
  try {
    const page = await Page.create({
      uniqueId: randomUUID(),
      slug: req.body.slug,
      title: req.body.title,
      heroTitle: req.body.heroTitle || '',
      body: req.body.body || '',
      metaDescription: req.body.metaDescription || '',
      isPublished: req.body.isPublished ?? true,
    });

    return res.status(201).json({ message: 'Page created', data: page });
  } catch (error) {
    return next(error);
  }
});

router.patch('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      {
        slug: req.body.slug,
        title: req.body.title,
        heroTitle: req.body.heroTitle,
        body: req.body.body,
        metaDescription: req.body.metaDescription,
        isPublished: req.body.isPublished,
      },
      { new: true },
    );

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({ message: 'Page updated', data: page });
  } catch (error) {
    return next(error);
  }
});

router.delete('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({ message: 'Page deleted' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
