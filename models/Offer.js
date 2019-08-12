var mongoose = require('mongoose');
var offerSchema = require('../schemas/offerSchema');
//创建model，这个地方的offers对应mongodb数据库中test的conllection。
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var Offer = mongoose.model('offers',offerSchema);
module.exports = Offer;