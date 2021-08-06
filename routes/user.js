var express = require("express");
var router = express.Router();
var User = require("../models/user");

var tokenService = require("../services/auth");
var passwordService = require("../services/password");

//User Registration
router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: passwordService.hashPassword(req.body.password),
    });
    console.log(newUser);
    let result = await newUser.save();
    console.log(result);
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});



//User Login
router.post("/login", async (req, res, next) => {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      console.log(err);
      res.json({
        message: "Error Accessing Database",
        status: 500,
      });
    }

    console.log(user);
    if (user) {
      let passwordMatch = passwordService.comparePasswords(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        let token = tokenService.assignToken(user);
        res.json({
          message: "login successful",
          status: 200,
          token,
        });
      }
    } else {
      console.log("Wrong password");
      res.json({
        message: "Wrong password",
        status: 403,
      });
    }
  });
});


// GET user information/profile
router.get("/profile", async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);

    if (currentUser) {
      
      let responseUser = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        deleted: currentUser.deleted,
        admin: currentUser.admin,
      };
      res.json({
        message: "User profile information loaded successfully",
        status: 200,
        currentUser,
      });
    } else {
      res.json({
        message: "Token was invalid or expired",
        status: 403,
      });
    }
  } else {
    res.json({
      message: "No token received",
      status: 403,
    });
  }
});

// Admin Access
router.get("/admin", async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);
  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    if (currentUser.admin) {
      console.log("I'm an admin!", currentUser);
      let allUsers = await User.find({
        deleted: false,
      });
      console.log("The users", allUsers);
    } else {
      res.send("unauthorized");
    }
  }
});

module.exports = router;
