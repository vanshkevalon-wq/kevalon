const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const applicationSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, default: () => randomUUID() },
    enrollmentNumber: {
      type: String,
      unique: true,
      default: () => `APP-${Date.now()}-${randomUUID().slice(0, 8)}`,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    linkedInProfile: { type: String, default: '', trim: true },
    portfolioUrl: { type: String, default: '', trim: true },
    resumeFileName: { type: String, default: '', trim: true },
    resumeFilePath: { type: String, default: '', trim: true },
    resumeFileUrl: { type: String, default: '', trim: true },
    role: { type: String, required: true, trim: true },
    positionId: { type: require('mongoose').Schema.Types.ObjectId, ref: 'Position', default: null },
    status: { type: String, default: 'submitted' },

    // Round 1 – Technical interview scheduling
    round1Status: { type: String, default: '' }, // 'scheduled' | 'selected' | 'rejected'
    round1Date: { type: String, default: '' },
    round1Time: { type: String, default: '' },
    round1NotifiedAt: { type: Date, default: null },

    // Round 2 – Practical interview scheduling
    round2Status: { type: String, default: '' }, // 'scheduled' | 'selected' | 'rejected'
    round2Date: { type: String, default: '' },
    round2Time: { type: String, default: '' },
    round2NotifiedAt: { type: Date, default: null },

    // Final outcome
    finalStatus: { type: String, default: '' }, // 'hired' | 'not_selected'
  },
  { timestamps: true },
);

module.exports = mongoose.model('Application', applicationSchema);
