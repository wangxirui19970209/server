var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema');
//创建model，这个地方的users对应mongodb数据库中test的conllection。
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var User = mongoose.model('users',userSchema);
module.exports = User;