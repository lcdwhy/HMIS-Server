let express = require('express');
let router = express.Router();
let sqlQuery = require('../MySql/sql');
let crypto = require('crypto');

// router.use(function(req, res, next){
//     res.append('Access-Control-Allow-Origin', '*');
//     // res.append('Access-Control-Allow-Content-Type', '*');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     next();
// })


//加密函数，主要是对密码进行加密
function jiami(str) {
    let salt = "haskdaksgasf"
    let obj = crypto.createHash('md5');
    str = str + salt;
    obj.update(str);
    return obj.digest('hex')
}

//管理员登录
router.post('/',async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let strQuery = "select * from admin where account = ? and password = ?"
    let result = await sqlQuery(strQuery, [username, jiami(password)])
    if(result.length == 0){
        res.send("登录失败")
    }else{
        req.session.username = result[0].username;
        res.send("登录成功")
    }
})


// 用户退出登录，注销session
router.get('/exitSession', (req, res) => {
    req.session.destroy(() => {
        console.log("退出成功")
    })
    res.send("成功退出！")
})

module.exports = router