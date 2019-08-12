var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var userSchema = new Schema({
    name: String,
    idCard: String,
    sex: String,
    age: String,
    phone: String,
    token: String,
});
module.exports = userSchema;