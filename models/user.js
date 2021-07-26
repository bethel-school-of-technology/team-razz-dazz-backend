var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

var User = mongoose.model("user", userSchema);

module.exports = User;
