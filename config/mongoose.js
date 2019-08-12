const mongoose = require('mongoose');
const config = require('./config');
//  mongoose.Promise = global.Promise;//如果有promise的问题，可以用这个试试
mongoose.connect(config.mongodb);//连接mongodb数据库
mongoose.connection.on('error', console.error.bind(console, '连接错误：'));
mongoose.connection.once('open', (callback) => {
    console.log('MongoDB连接成功！！');
});
module.exports = () => {
  return mongoose
}