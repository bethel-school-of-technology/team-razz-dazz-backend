var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var customerRouter = require("./routes/customer");

var app = express();

var connectionString =
  "mongodb+srv://steven:Password1!@formsubmit.3irda.mongodb.net/Customers?retryWrites=true&w=majority";
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function () {
    console.log("database is connected");
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api/customer", customerRouter);

module.exports = app;
