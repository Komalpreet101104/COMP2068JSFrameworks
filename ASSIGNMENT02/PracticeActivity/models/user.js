var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Check if the model is already defined, and reuse it if so.
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
