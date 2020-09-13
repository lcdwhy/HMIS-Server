var express = require('express');
var router = express.Router();
var sqlQuery = require('../../../MySql/sql')


/* GET doctor listing. */
router.post('/', async function(req, res) {
  let page = req.body.page;

  // 查询第page页的医生信息
  let strQuery = "select username,account,password,email,phone,sex,departmentname,categoriesname from doctor inner join department on doctor.departmentid = department.id inner join categories on doctor.categoriesid = categories.id limit ?,6"
  // 查询医生的总数
  let totalQuery = "select count(*) as total from doctor"

  let result = await sqlQuery(strQuery,[(page-1)*6])
  let total = await sqlQuery(totalQuery)
  let obj = {
    tableData:result,
    total:total[0].total
  }
  res.json(obj)
});


// 删除指定的医生
router.post('/delete', async (req, res) => {
  let user = req.body.val;
  console.log(user)
  if(Array.isArray(user)){
    let str = "delete from doctor where username = ?"
    user.map( async item => {
     await sqlQuery(str, item.username)
    })
  }else{
    let str = "delete from doctor where username = ?"
     await sqlQuery(str, user)
  }
  res.send("删除医生成功")
})

//编译医生信息
router.post('/edit', async (req, res) => {

  console.log(req.body.ruleForm)
  let ruleForm = req.body.ruleForm;
  let username = ruleForm.username;
  let account = ruleForm.account;
  let password = ruleForm.password;
  let sex = ruleForm.sex;
  let email = ruleForm.email;
  let phone = ruleForm.phone;
  let bakname = ruleForm.bakname;

  let str = "update doctor set username=?,account=?,password=?,sex=?,email=?,phone=? where username=?"
  let result = await sqlQuery(str,[username,account,password,sex,email,phone,bakname]);
  console.log(result)
  res.send("修改成功")
})
module.exports = router;