var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.post("/ordersubmit", async (req, res, next) => {
  try {
    console.log(req.body);
    let newOrder = new Order({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      orderSummary: req.body.orderSummary
    });
    console.log(newOrder);
    let result = await newOrder.save();
    console.log(result);
    res.send("order created");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

module.exports = router;
