var express = require('express');
var router = express.Router();

var Introduction = require('../models/Introduction');// 引入模型
var admin = require('../models/Admin');// 引入模型
router.post('/get-detail',(req,res,next)=>{
  Introduction.findOne({},(err, doc)=>{
    if (err) {
      res.send('server or db error');
    } else {
      res.send({
        code: 0,
        data: doc,
      })
    }
  })
})
router.post('/update',(req,res,next)=>{
  let token = req.body.token || ''
  if (token) {
    admin.findOne({token},(err, doc)=>{
      if (err) {
        res.send('server or db error');
      } else {
        if (doc == null) {
          res.send({
            code: 3004,
            msg: '请登录'
          })
        } else {
          if (req.body.slogans && req.body.name && req.body.phone){
            req.body.slogans = JSON.parse(req.body.slogans)
            Introduction.update({},req.body,(err, doc)=>{
              if (err) {
                res.send('server or db error');
              } else {
                res.send({
                  code: 0,
                  data: doc,
                })
              }
            })
          } else {
            res.send({
              code: 303,
              msg: '参数错误'
            });
          }
        }
      }
    })
  } else {
      res.send({
        code: 3004,
        msg: '请登录'
      })
    }
  })
module.exports = router;