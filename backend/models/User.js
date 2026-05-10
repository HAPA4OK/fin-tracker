const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: { type: String, trim: true },
  login: { type: String, trim: true, required: true, unique: true },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  gender: String,
}, { timestamps: true }); 

module.exports = mongoose.models.User || mongoose.model('User', userSchema);