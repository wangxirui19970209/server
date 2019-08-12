var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var introductionSchema = new Schema({
  name: String,
  phone: String,
  slogans: Array
});
module.exports = introductionSchema;