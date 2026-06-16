const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const pageSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, default: () => randomUUID() },
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    heroTitle: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    metaDescription: { type: String, default: '', trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Page', pageSchema);
