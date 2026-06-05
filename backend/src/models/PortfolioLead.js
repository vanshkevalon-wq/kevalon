const mongoose = require('mongoose');

const portfolioLeadSchema = new mongoose.Schema(
  {
    projectTitle: { type: String, required: true },
    projectSlug:  { type: String, required: true },
    email:        { type: String, default: '' },
    phone:        { type: String, default: '' },
    status:       { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PortfolioLead', portfolioLeadSchema);
