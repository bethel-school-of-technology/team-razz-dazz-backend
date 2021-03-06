var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var tokenService = require("../services/auth");
var User = require("../models/user");
var nodemailer = require("nodemailer");
var cors = require("cors");
const creds = require("../config");

const { body, validationResult } = require("express-validator");

var transport = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// New order from User
router.post("/ordersubmit", body("email").isEmail(), async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

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
        orderSummary: req.body.orderSummary,
      });
      // console.log(newOrder);
      let result = await newOrder.save();
      console.log(result);
      res.send("order created");
    } else {
      res.send("unauthorized");
    }
  }
});

// Order submit success email
router.post("/send", (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var address = req.body.address;
  var orderSummary = req.body.orderSummary;
  var content = `firstname: ${firstName} \n lastname: ${lastName} \n email: ${email} \n mobile: ${phoneNumber} \n address: ${address} \n order: ${orderSummary} `;

  var mail = {
    from: "The Noble Cookie",
    to: "thenoblecookies@gmail.com",
    subject: "New Message from Order Form",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
      transporter.sendMail(
        {
          from: "The Noble Cookie",
          to: email,
          subject: "Order submission was successful",
          text: `Thank you for ordering with us! \n\n Order details\nfirstname: ${firstName} \n lastname: ${lastName} \n email: ${email} \n mobile: ${phoneNumber} \n address: ${address} \n order: ${orderSummary} `,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: " + info.response);
          }
        }
      );
    }
  });
});

// GET order information/new orders
router.get("/usersubmission", async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);

    if (currentUser) {
      let bakedGoods = await Order.find({
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
      });
      res.json({
        message: "Let's take a look at your delicious order summary!",
        status: 200,
        currentUser,
        bakedGoods,
      });
    } else {
      res.json({
        message: "Whoops, something's not jiving",
        status: 403,
      });
    }
  }
});

// Contact Form
router.post("/contact", (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var address = req.body.address;
  var orderSummary = req.body.orderSummary;
  var content = `firstname: ${firstName} \n lastname: ${lastName} \n email: ${email} \n mobile: ${phoneNumber} \n address: ${address} \n message: ${orderSummary} `;

  var mail = {
    from: "The Noble Cookie",
    to: "thenoblecookies@gmail.com",
    subject: "New Message from Contact Form",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
      transporter.sendMail(
        {
          from: "The Noble Cookie",
          to: email,
          subject: "Thank you for reaching out.",
          text: `Thank you for contacting us! We will get back to you shortly`,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: " + info.response);
          }
        }
      );
    }
  });
});

// Admin View all orders
router.get("/adminorderview", async (req, res, next) => {
  let myToken = req.headers.authorization;
  console.log(myToken);
  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    if (currentUser.admin) {
      console.log("I'm an admin!", currentUser);
      let allOrders = await Order.find({
        deleted: false,
      });
      res.json({
        message: "The admin view of all orders has been loaded successfully",
        allOrders,
      });
      console.log("The orders", allOrders);
    } else {
      res.json({
        message: "You are not authorized",
        status: 403,
      });
    }
  }
});

router.put("/:_id", async (req, res, next) => {
  const orderId = req.params._id;
  let myToken = req.body.headers;
  console.log(orderId);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    // console.log(currentUser);
    if (currentUser) {
      Order.findByIdAndUpdate(
        orderId,
        { deleted: true },
        function (error, result) {
          if (error) {
            res.json({
              message: "Deleting the order has failed",
            });
          } else {
            // console.log(result);
            res.json({
              message: "Success, the order has been deleted!",
            });
          }
        }
      );
    }
  }
});

module.exports = router;
