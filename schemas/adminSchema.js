var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var adminSchema = new Schema({
  userName: String,
  password: String,
  token: String,
});
module.exports = adminSchema;