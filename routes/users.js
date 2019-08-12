var express = require('express');
var router = express.Router();

var User = require('../models/User');// 引入模型
var admin = require('../models/Admin');// 引入模型
// 修改用户信息
router.post('/up-date',(req,res,next)=>{
  let token = req.body.token || ''
  if (token) {
    User.find({token},(err, doc)=>{
      if (err) {
        res.send('server or db error');
      } else {
        if (doc == null) {
          res.send({
            code: 3004,
            msg: '请登录'
          })
        } else {
          let update = {
            phone: req.body.phone || '',
            name: req.body.name || '',
            age: req.body.age || '',
            sex: req.body.sex || '',
          }
          User.update({token},update,(err, doc)=>{
            if (err) {
              res.send('server or db error');
              return
            }
            res.send({
              code: 0,
              data: '修改成功',
            })
          })
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
// 查看用户信息
router.post('/get',(req,res,next)=>{
  User.findOne({idCard: req.body.idCard},(err, doc)=>{
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
// 登录
router.post('/submit',(req,res,next)=>{
  if (req.body.idCard) {
    User.findOne(req.body,(err, doc)=>{
      if (err) {
        res.send('server or db error');
      } else {
        if (doc == null) {
          res.send({
            code: 3001,
            msg: '账号错误'
          })
        } else {
          const userInfo = JSON.parse(JSON.stringify(doc))
          token = (new Date()).getTime() + encodeURI(userInfo.name)
          User.update(req.body, {token}, (err, docs)=>{
            if (err) {
              res.send('server or db error');
              return
            }
            userInfo.token = token
            res.send({
              code: 0,
              data: userInfo,
            });
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
  User.update(req.body, {token: ''}, (err, docs)=>{
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
// 注册
router.post('/register',(req,res,next)=>{
  if (req.body.name && req.body.phone && req.body.idCard) {
    User.findOne({phone: req.body.phone}, (err, doc) => {
      if (err) {
        res.send('server or db error');
      } else {
        if (!doc) {
          User.findOne({idCard: req.body.idCard}, (err, doc) => {
            if (err) {
              res.send('server or db error');
            } else {
              if (!doc) {
                req.body.token = ''
                User.create(req.body,(err, doc)=>{
                  if (err) {
                    res.send('server or db error');
                  } else {
                    res.send({
                      code: 0,
                      data: '注册成功'
                    })
                  }
                })
              } else {
                res.send({
                  code: 30002,
                  data: '此身份证号已被注册'
                })
              }
            }
          })
        } else {
          res.send({
            code: 30001,
            data: '此手机号已被注册'
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
router.post('/page',(req,res,next) => {
  const searchData = {}
  if (req.body.idCard) {
    searchData.idCard = req.body.idCard
  }
  if (req.body.name) {
    searchData.name = req.body.name
  }
  if (req.body.phone) {
    searchData.phone = req.body.phone
  }
  const pageSize = Number(req.body.pageSize) || 5
  const count = req.body.count || 1
  User.find(searchData).sort({time: -1}).limit(pageSize).skip((count-1)*pageSize).exec().then((doc) => {
    if (!doc) {
      res.send('server or db error');
    } else {
      User.count(searchData, (err, count) => {
        if (err) {
          res.send('server or db error');
          return
        }
        res.send({
          code: 0,
          data: {
            page: doc,
            total: count
          }
        });
      })
    }
  })
});
router.post('/user/remove',(req,res,next) => {
  let token = req.body.token || ''
  if (!token) {
    res.send({
      code: 3004,
      msg: '请登录'
    })
    return
  }
  admin.findOne({token},(errToken, docToken)=>{
    if (errToken) {
      res.send('server or db error');
    } else {
      if (docToken == null) {
        res.send({
          code: 3004,
          msg: '请登录'
        })
      } else {
      User.remove({idCard: req.body.idCard}, (err, docs) => {
        if (err) {
            res.send('server or db error');
            return
          } else {
            res.send({
              code: 0,
              data: null
            });
          }
        })
      }
    }
  })
});
module.exports = router;