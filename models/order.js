var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  firstName: {
    _id: {
      type: Number
    },
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
  deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

var Order = mongoose.model("order", orderSchema);

module.exports = Order;
