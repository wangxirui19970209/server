var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var orderSchema = new Schema({
  time: Number,
  idCard: String,
  status: Number,
  offerId: Number,
  offerName: String,
  userName: String,
  reservationTime: String
})
module.exports = orderSchema