var express = require('express');
var router = express.Router();
var changepassword = require('./changepassword')

// 引入上传模块
var multer = require('multer');
// 配置上传对象
var upload = multer({dest: './public/upload'});
var fs = require('fs')
var sqlQuery = require('../../../MySql/sql');

// 获取管理员的信息
router.post('/', async (req, res, next) => {
  let username = req.session.username;
  let str = "select * from admin where username = ?"
  let result =await sqlQuery(str, [username])
  res.json(result);
});

//头像上传
router.post('/upload', upload.single('file'), async (req, res) => {
  let username = req.session.username
  let result = rename(req)
  let str = "update admin set imgUrl = ? where username = ?"
  await sqlQuery(str,[result.imgUrl,username])
  res.json(result)
})

// 文件重命名
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

// 修改密码
router.use('/changepassword',changepassword )

module.exports = router;