var express = require('express');
var router = express.Router();
var fristpageRouter = require('./fristpageRouter');
var articleRouter = require('./articleRouter/articleRouter')
var doctorsRouter = require('./doctorsRouter/doctorsRouter');
var patientsRouter = require('./patientsRouter');
var infoRouter = require('./info/infoRouter')
var userRouter = require('./usersRouter/usersRouter')
var durgRouter = require('./durgRouter/durgRouter')
// 判断是否符合条件进入后台中间件
function permisson(req, res, next){
  if(req.session.username == undefined){
    res.send("未登录")
  }else{
    next()
  }
}

/* GET users listing. */
router.post('/', permisson, function(req, res, next) {
  res.send("数据发送")
});

// 首页界面模块
router.use('/fristpage', fristpageRouter)
// 用户管理模块
router.use('/user', userRouter)
// 后台文章管理
router.use('/article', articleRouter)
// 后台病人管理
router.use('/patients', patientsRouter)
// 后台医生管理
router.use('/doctors', doctorsRouter)
// 个人信息模块
router.use('/info', infoRouter)
//药品管理模块
router.use('/durg', durgRouter)
module.exports = router;