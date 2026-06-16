const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');
const AdminUser = require('../models/AdminUser');

async function ensureAdminUser() {
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'change_this_password';

  const existing = await AdminUser.findOne({ email });

  if (existing) {
    return existing;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  return AdminUser.create({ uniqueId: randomUUID(), email, passwordHash, role: 'admin' });
}

module.exports = { ensureAdminUser };
