var express = require('express');
var router = express.Router();
var customer = require('../models/customer');

router.post('/ordersubmit', async (req, res, next) => {
  var myData = new customer(req.body);
  myData.save().then(item=> {
    res.send("item saved to db");
  }).catch(err => {
    res.status(400).send('unable')
  });
});
module.exports = router;
