var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
var Order = require('../models/Order');// 引入模型

/* GET home page. */
router.post('/about-info', function(req, res, next) {
  let memberNum = 0
  let orderNum = 0
  const promise1 = new Promise((resolve, reject) => {
    User.count(function (err, result) {
      if (err) {
        reject()
      }
      memberNum = result
      resolve()
    })
  })
  const promise2 = new Promise((resolve, reject) => {
    Order.count(function (err, result) {
      if (err) {
        reject()
      }
      orderNum = result
      resolve()
    })
  })
  Promise.all([promise1, promise2]).then(function () {
    res.send({
      code: 0,
      data: {
        memberNum,
        orderNum
      }
    })
  })
})
module.exports = router;
