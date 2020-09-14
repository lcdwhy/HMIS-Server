let express = require('express');
let router = express.Router();
let sqlQuery = require('../MySql/sql')
let crypto = require('crypto')


//加密函数
function jiami(str) {
    let salt = "haskdaksgasf"
    let obj = crypto.createHash('md5');
    str = str + salt;
    obj.update(str);
    return obj.digest('hex')
}


//管理员账号注册
router.post('/', async (req, res) => {
    let username = req.body.username;
    let account = req.body.account;
    let password = req.body.password;
    let email = req.body.email;

    let strQuery = "select * from admin where account = ?"
    let result =await sqlQuery(strQuery,[account]);
    
    if(result.length != 0){
        res.send({code:400,data:"账号已存在"})
    }else{
        strQuery = "INSERT INTO `admin`(username,account,password,email) VALUES(?,?,?,?)"
        let result =await sqlQuery(strQuery,[username,account,jiami(password),email]);
        res.send({code:200,data:"注册成功"})
    }
    
})

module.exports = router;
