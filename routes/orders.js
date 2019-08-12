var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
var Order = require('../models/Order');// 引入模型
var Offer = require('../models/offer');// 引入模型
var admin = require('../models/Admin');// 引入模型
router.post('/add',(req,res,next) => {
  if (req.body.userName&&req.body.offerName&&req.body.idCard&&req.body.offerId) {
    let token = req.body.token || ''
    if (!token) {
      res.send({
        code: 3004,
        msg: '请登录'
      })
      return
    }
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
          Order.find({
            idCard: req.body.idCard,
            offerId: req.body.offerId
          },(err, orderDoc)=>{
            let orderStatus = []
            if(Array.isArray(orderDoc)) {
              orderStatus = orderDoc.filter(v => v.status === 1)
            }
            if (orderStatus.length > 0) {
              res.send({
                code: 2004,
                msg: '已预定过该套餐'
              });
              return
            }
            var data = {
              time : new Date().getTime(),
              idCard : req.body.idCard || '',
              userName : req.body.userName || '',
              offerName : req.body.offerName || '',
              status : req.body.status || 1,
              offerId : req.body.offerId || 0,
              reservationTime : req.body.reservationTime || ''
            }
            Order.create(data, (err, docs) => {
              if (err) {
                res.send('server or db error');
              } else {
                Offer.findOne({offerId: req.body.offerId},(err, offerDoc)=>{
                  if (err) {
                    res.send('server or db error');
                  } else {
                    let update = {
                      people: offerDoc.people+1
                    }
                    Offer.update({offerId: req.body.offerId}, update, (err, offerDocs) => {
                      if (err) {
                        res.send('server or db error');
                      } else {
                        res.send({
                          code: 0,
                          data: null
                        });
                      }
                    })
                  }
                })
              }
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
});
router.post('/update',(req,res,next)=>{
  if (req.body.order && req.body.status){
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
          req.body.order = JSON.parse(req.body.order) || {}
          Order.update(req.body.order,{
            status: req.body.status,
            reservationTime: req.body.reservationTime
          },(err, doc)=>{
            if (err) {
              res.send('server or db error');
            } else {
              res.send({
                code: 0,
                data: '操作成功',
              })
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
})
router.post('/get-orders',(req,res,next) => {
  const searchData = {}
  if (req.body.status) {
    searchData.status = req.body.status
  }
  if (req.body.offerId) {
    searchData.offerId = req.body.offerId
  }
  if (req.body.idCard) {
    searchData.idCard = req.body.idCard
  }
  const pageSize = Number(req.body.pageSize) || 5
  const count = req.body.count || 1
  Order.find(searchData).sort({time: -1}).limit(pageSize).skip((count-1)*pageSize).exec().then((doc) => {
    if (!doc) {
      res.send('server or db error');
    } else {
      Order.count(searchData, (err, count) => {
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
module.exports = router;