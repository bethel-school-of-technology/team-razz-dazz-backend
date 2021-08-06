var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Contact Us
router.post("/contact", (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var address = req.body.address;
  var orderSummary = req.body.orderSummary;
  var content = `firstname: ${firstName} \n lastname: ${lastName} \n email: ${email} \n mobile: ${phoneNumber} \n address: ${address} \n order: ${orderSummary} `;

  var mail = {
    from: "The Noble Cookie",
    to: "searcycreative@gmail.com",
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

module.exports = router;
