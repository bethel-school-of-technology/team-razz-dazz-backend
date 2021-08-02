var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require('cors');
var tokenService = require("./services/auth");

var indexRouter = require("./routes/api/index");
var orderRouter = require("./routes/api/order");
var userRouter = require("./routes/api/user");

var app = express();

var connectionString =
  "mongodb+srv://steven:Password1!@cookies.3irda.mongodb.net/CookieForms?retryWrites=true&w=majority";

;
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

app.use(cors());

app.use(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return next();
  }

  const token = header.split('')[1];

  const user = await tokenService.verifyToken(token);
  req.user = user;
  next();
})


app.use("/", indexRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);


module.exports = app;
