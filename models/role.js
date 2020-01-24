const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    role: {
      required: true,
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Role', RoleSchema);
