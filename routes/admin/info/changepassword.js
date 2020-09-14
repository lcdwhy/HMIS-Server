var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../MySql/sql');
let crypto = require('crypto');
let {analysis} = require('../../tools/tools')

function jiami(str) {
    let salt = "haskdaksgasf"
    let obj = crypto.createHash('md5');
    str = str + salt;
    obj.update(str);
    return obj.digest('hex')
}

/* 修改管理员的登录密码*/
router.post('/', async (req, res) => {
    let newpassword =jiami(req.body.password);
    
    let token = analysis(req.headers['authentication'])
     let username = token.key
    let str = "update admin set password = ? where username= ?"
    let result = await sqlQuery(str, [newpassword, username]);
    console.log(result)
    res.send("修改成功")
});

module.exports = router;