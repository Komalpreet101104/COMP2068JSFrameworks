const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); 

// To Define User Schema
var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
});

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error); 
  }
});

// To Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
