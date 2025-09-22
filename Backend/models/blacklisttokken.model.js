const mongoose = require('mongoose');

const BlacklistTokkenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  blacklistedAt: { type: Date, default: Date.now },
  // set expiresAt to the JWT expiry time so documents auto-remove after the token would expire
  expiresAt: { type: Date, required: true },
});

// TTL index to automatically remove expired blacklist entries
BlacklistTokkenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// helper to check if a token is blacklisted
BlacklistTokkenSchema.statics.isBlacklisted = async function (token) {
  const doc = await this.findOne({ token });
  return !!doc;
};

module.exports = mongoose.model('BlacklistTokken', BlacklistTokkenSchema);