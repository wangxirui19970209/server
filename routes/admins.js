var express = require('express');
var router = express.Router();

var admin = require('../models/Admin');// 引入模型
// 登录
router.post('/submit',(req,res,next)=>{
  if (req.body.userName&&req.body.password) {
    admin.findOne(req.body,(err, doc)=>{
      if (err) {
        res.send('server or db error');
      } else {
        if (doc == null) {
          res.send({
            code: 3001,
            msg: '账号错误'
          })
        } else {
          token = (new Date()).getTime() + encodeURI(doc.userName)
          admin.update(req.body, {token}, (err, docs)=>{
            if (err) {
              res.send('server or db error');
            } else {
              res.send({
                code: 0,
                data: {
                  userName: doc.userName,
                  token
                },
              });
            }
          })
        }
      }
    })
  } else {
    res.send({
      code: 303,
      msg: '参数错误'
    });
  }
});
// 退出
// res.clearCookie('id')
router.post('/accountLogout',(req,res,next)=>{
  admin.update(req.body, {token: ''}, (err, docs)=>{
    if (err) {
      res.send('server or db error');
      return
    }
    res.send({
      code: 0,
      data: null,
    });
  })
});
module.exports = router;