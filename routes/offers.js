var express = require('express');
var router = express.Router();

var Offer = require('../models/Offer');// 引入模型
var admin = require('../models/Admin');// 引入模型
const OfferModel = {
  offer(search){
    return Offer.find(search)
        .exec()
  },
  findOffer(search,pageSize){
    return Offer.find(search)
        .limit(pageSize)
        .exec()
  },
  findOffersOrder(search,sort,pageSize,Count){
    return Offer.find(search)
        .sort(sort)
        .limit(pageSize)
        .skip(Count)
        .exec()
  }
}
router.post('/offer',(req,res,next) => {
  var search = JSON.parse(req.body.search || '{}')
  OfferModel.offer(search).then((offers) => {
    if(!offers){
      res.send('server or db error');
    }
    res.send({
      code: 0,
      data: {
        offers:offers
      }
    });
    })
    .catch(next);
});
router.post('/offer/add',(req,res,next) => {
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
        Offer.findOne({offerId: req.body.offerId},(err, doc)=>{
          if (err) {
            res.send('server or db error');
            return
          }
          if (doc) {
            res.send({
              code: 2004,
              msg: '已存在该套餐ID'
            });
          } else {
            Offer.create(req.body, (err2, docs) => {
              if (err2) {
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
    }
  })
});
router.post('/offer/remove',(req,res,next) => {
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
      Offer.remove(req.body, (err, docs) => {
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
router.post('/offer/update',(req,res,next) => {
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
      const update = JSON.parse(JSON.stringify(req.body))
      delete update.offerId
      Offer.update({offerId: req.body.offerId}, update, (err, docs) => {
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
router.post('/offer/sort',(req,res,next) => {
  var pageSize = Number(req.body.pageSize) || 5
  var search = JSON.parse(req.body.search || '{}')
  var sort = JSON.parse(req.body.sort || '{}')
  Offer.find(search).sort(sort).limit(pageSize).exec().then((offers) => {
    if(!offers){
      res.send('server or db error');
    }
    res.send({
      code: 0,
      data: {
        offers:offers
      }
    });
    })
    .catch(next);
});
router.post('/offer/page',(req,res,next) => {
  var pageSize = Number(req.body.pageSize) || 5
  var Count = Number(req.body.count) || 1
  var search = JSON.parse(req.body.search || '{}')
  var sort = JSON.parse(req.body.sort || '{}')
  OfferModel.findOffersOrder(search,sort,pageSize,(Count-1)*pageSize)
    .then((doc) => {
      if(!doc){
        res.send('server or db error');
      }
      Offer.count(search, (err, count) => {
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
    })
    .catch(next);
})
module.exports = router;