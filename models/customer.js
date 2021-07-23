var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orderSummary: {
        type: String,
        required: true
    }
})


var Customer = mongoose.model('customer', customerSchema);

module.exports = Customer