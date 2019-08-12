var mongoose = require('mongoose')
var orderSchema = require('../schemas/orderSchema');
var Order = mongoose.model('orders',orderSchema);
module.exports = Order;