const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'employee',
  enum: ["employee", "manager"]
 },
 accessToken: {
  type: String
 }
});

module.exports = mongoose.model('user', UserSchema);