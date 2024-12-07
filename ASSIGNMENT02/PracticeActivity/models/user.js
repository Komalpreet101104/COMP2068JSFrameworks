const bcrypt = require('bcrypt'); // Import bcrypt for hashing
const mongoose = require('mongoose'); // Import mongoose for MongoDB schema and model

// Define User Schema
var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Added unique email constraint
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
    next(error); // Pass error to the next middleware
  }
});

// Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Export Model, avoiding overwriting an existing model
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
