const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

var tokenService = {
  assignToken: function (user) {
    const token = jwt.sign(
      {
        username: user.username,
        _id: user._id,
      },
      "mysupersecretkey",
      {
        expiresIn: "1h",
      }
    );
    return token;
  },
  verifyToken: function (token) {
    try {
      let decoded = jwt.verify(token, "mysupersecretkey");
      return User.findById(decoded._id);
    } catch (err) {
      return err;
    }
  },
};



module.exports = tokenService;

