var express = require('express');
var router = express.Router();
var articlelist = require('./articlelist')
var addarticle = require('./addarticle')

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('文章管理router');
});

// 文章列表
router.use('/articlelist', articlelist)

// 发布文章
router.use('/addarticle', addarticle)

module.exports = router;