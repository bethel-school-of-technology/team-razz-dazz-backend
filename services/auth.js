const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secretKey = 'mysupersecretkey';

var tokenService = {
  assignToken: function (user) {
    const token = jwt.sign(
      {
        username: user.username,
        _id: user._id,
      },
      secretKey,
      {
        expiresIn: "24h",
      }
    );
    return token;
  },
  verifyToken: function (token) {
    try {
      let decoded = jwt.verify(token, secretKey);
      return User.findByPk(decoded._id);
    } catch (err) {
      return err;
    }
  },
};



module.exports = tokenService;

