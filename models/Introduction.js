var mongoose = require('mongoose');
var introductionSchema = require('../schemas/introductionSchema');
//创建model
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var Introduction = mongoose.model('introductions',introductionSchema);
module.exports = Introduction;