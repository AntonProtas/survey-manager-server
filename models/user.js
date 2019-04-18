const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String
    },
    email: {
      required: true,
      unique: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
  },
  { versionKey: false }
);

UserSchema.pre('save', async function(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt, null);
    user.password = hash;
    next();
  } catch (error) {
    throw error;
  }
});

UserSchema.methods.comparePasswords = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', UserSchema);
