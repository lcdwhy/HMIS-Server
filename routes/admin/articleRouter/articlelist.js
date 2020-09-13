var express = require('express');
var router = express.Router();
var sqlQuery = require('../../../MySql/sql')

/* 文章列表模块 */
router.post('/', async function(req, res) {
  let page = req.body.page;
  // 查询第page页的文章信息
  let strQuery = "select report_time,author,title from article  limit ?,6"
  // 查询文章的总篇数
  let totalQuery = "select count(*) as total from article"
  let result = await sqlQuery(strQuery,[(page-1)*6])
  let total = await sqlQuery(totalQuery)
  let obj = {
    tableData:result,
    total:total[0].total
  }
  res.json(obj)
});


//删除文章模块
router.post('/delete', async (req, res) => {
  let title = req.body.val;
  if(Array.isArray(title)){
    let str = "delete from article where title = ?"
    title.map( async item => {
     await sqlQuery(str, item.title)
    })
  }else{
    let str = "delete from article where title = ?"
     await sqlQuery(str, title)
  }
  res.send("删除文章成功")
})
module.exports = router;