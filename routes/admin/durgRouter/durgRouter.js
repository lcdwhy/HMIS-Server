var express = require('express');
const sqlQuery = require('../../../MySql/sql');
var router = express.Router();

/* 获取药品列表. */
router.post('/', async (req, res, next) => {
  //请求第page页的药品数据
  let page = req.body.page;
  
  
  //查询从？开始的6条药品数据
  let str = "select durgname,price,inventory from durg limit ?,6 " ;
  //查询数据库的药品数据一共有多少条
  let totalQuery = "select count(*) as total from durg" ;


  let result = await sqlQuery(str,[(page-1)*6]);
  let total = await sqlQuery(totalQuery);

  //将数据进行包装，发送给客户端
  let obj = {
    tableData:result,
    total:total[0].total
  }
  res.json(obj)
});

//删除指定药品项
router.post('/delete', async (req, res) => {
  let user = req.body.val;
  if(Array.isArray(user)){
    let str = "delete from durg where durgname = ?"
    user.map( async item => {
     await sqlQuery(str, item.durgname)
    })
  }else{
    let str = "delete from durg where durgname = ?"
     await sqlQuery(str, user)
  }
  res.send("删除药品成功")
})

//编辑药品信息
router.post('/edit', async (req, res) => {
  console.log(req.body.ruleForm)
  
  let ruleForm = req.body.ruleForm;
  let durgname = ruleForm.durgname;
  let price = ruleForm.price;
  let inventory = ruleForm.inventory;
  let bakname = ruleForm.bakname;

  let str = "update durg set durgname=?,price=?,inventory=? where durgname = ?"
  await sqlQuery(str,[durgname,price,inventory,bakname]);
  res.send("修改成功")

})
module.exports = router;