var express = require('express');
var router = express.Router();
var userlist = require('./userlist')
var userrole = require('./userrole')
var userpower = require('./userpower')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('用户管理router');
// });


// 用户列表
router.use('/userlist', userlist);

// 用户角色
router.use('/userrole', userrole);

// 用户权限
router.use('/userpower', userpower);

module.exports = router;