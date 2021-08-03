var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var tokenService = require("../services/auth");
var User = require("../models/user");

// New order from User
router.post("/ordersubmit", async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);

    if (currentUser) {
      // console.log("I'm the current user!", currentUser);
      let newOrder = new Order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        orderSummary: req.body.orderSummary
      });
      // console.log(newOrder);
      let result = await newOrder.save();
      console.log(result);
      res.send("order created");
    } else {
      res.send ("unauthorized")
    }
  }
});

// GET order information/new orders
router.get("/usersubmission", async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);

    if (currentUser) {
      let bakedGoods = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        address: currentUser.address,
        orderSummary: currentUser.orderSummary,
      };
      res.json({
        message: "Let's take a look at your delicious order summary!",
        status: 200,
        currentUser,
      });
    } else {
      res.json({
        message: "Have you signed in, yet?",
        status: 403,
      });
    }
  } else {
    res.json({
      message: "Whoops, something's not jiving",
      status: 403,
    });
  }
});


module.exports = router;
