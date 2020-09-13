var express = require('express');
var router = express.Router();

// 引入上传模块
var multer = require('multer');
// 配置上传对象
var upload = multer({dest: './public/upload'});
var fs = require('fs')
var strQuery = require('../../../MySql/sql');
const sqlQuery = require('../../../MySql/sql');
/* GET home page. */
router.post('/', async (req, res, next) => {
  let username = req.session.username;
  let str = "select * from admin where account = ?"
  let result =await strQuery(str, [username])
  res.json(result);
});
/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('文章发布router');
});


// 文章发布中的图片上传
router.post('/upload', upload.single('file'), async (req, res) => {
    let result = rename(req)
    res.json(result)
  })

//文章保存到数据库中 
router.post('/report', async (req, res) => {
  
  let username = req.session.username; //设置发布者的名字
  let title = req.body.title;           //发布文章的标题
  let content = req.body.content;       //发布文章的内容
  let report_time = format(new Date()); //设置发布时间
  let str = "insert into article(title, author, report_time, content) values(?,?,?,?)";
  await sqlQuery(str,[title, username, report_time, content])
  res.send("发布成功！")
})


// 定义文件重命名方法
function rename(req){
    let oldPath = req.file.destination+"/"+req.file.filename;
    let newPath = req.file.destination+"/"+req.file.filename+req.file.originalname;
    fs.rename(oldPath, newPath, () => {
      console.log("改名成功")
    })
    console.log("./upload/"+req.file.filename+req.file.originalname)
    return {
      state: "ok",
      imgUrl:"/upload/"+ req.file.filename+req.file.originalname
    }
  }


  // 将时间戳转化为普通日期格式
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}


module.exports = router;