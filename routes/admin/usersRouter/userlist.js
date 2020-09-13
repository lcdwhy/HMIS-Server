var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../MySql/sql');

/* GET users listing. */
router.post('/', async (req, res, next) => {
  let page = req.body.page;
  // 查询第page页的用户信息
  let strQuery = "select username,account,password,sex,email,phonenumber,address,rolename,register_time from user inner join role on user.roleid = role.id limit ?,6"
  // 查询用户的总人数
  let totalQuery = "select count(*) as total from user"
  let result = await sqlQuery(strQuery,[(page-1)*6])
  let total = await sqlQuery(totalQuery)
  let obj = {
    tableData:result,
    total:total[0].total
  }
  res.json(obj)
});

// 删除指定用户
router.post('/delete', async (req, res) => {
  let user = req.body.val;
  if(Array.isArray(user)){
    let str = "delete from user where username = ?"
    user.map( async item => {
     await sqlQuery(str, item.username)
    })
  }else{
    let str = "delete from user where username = ?"
     await sqlQuery(str, user)
  }
  res.send("删除用户成功")
})

//编辑修改用户信息
router.post('/edit', async (req, res) => {
  let ruleForm = req.body.ruleForm;
  let username = ruleForm.username;
  let account = ruleForm.account;
  let password = ruleForm.password;
  let sex = ruleForm.sex;
  let email = ruleForm.email;
  let phonenumber = ruleForm.phonenumber;
  let address = ruleForm.address;
  let bakname = ruleForm.bakname;

  let str = "update user set username=?,account=?,password=?,sex=?,email=?,phonenumber=?,address=? where username=?"
  await sqlQuery(str,[username,account,password,sex,email,phonenumber,address,bakname]);
  res.send("修改成功")
})

module.exports = router;