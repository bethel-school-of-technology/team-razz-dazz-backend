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



module.exports = router;
