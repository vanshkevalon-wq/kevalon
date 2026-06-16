const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const adminUserSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, default: () => randomUUID() },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('AdminUser', adminUserSchema);
