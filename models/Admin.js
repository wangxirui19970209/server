var mongoose = require('mongoose');
var adminSchema = require('../schemas/adminSchema');
//创建model，
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var Admin = mongoose.model('admins',adminSchema);
module.exports = Admin;