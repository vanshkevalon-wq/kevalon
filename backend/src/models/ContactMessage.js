const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const contactMessageSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, default: () => randomUUID() },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, default: 'new' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
