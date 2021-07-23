var express = require('express');
var router = express.Router();
var customer = require('../models/customer');

router.post('/ordersubmit', async (req, res, next) => {
  try {
    console.log(req.body);
    let newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      orderSummary: req.body.orderSummary
    });
    console.log(newUser)
  }
  catch(err) {

  }
})

module.exports = router;
