var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,    
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orderSummary: {
    type: String,
    required: true,
  },
});

var Order = mongoose.model("order", orderSchema);

module.exports = Order;
