var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var offerSchema = new Schema({
  offerId: Number,
  name: String,
  minPrice: Number,
  maxPrice: Number,
  time: Number,
  people: Number,
  detail: String,
  number: Number
});
module.exports = offerSchema;