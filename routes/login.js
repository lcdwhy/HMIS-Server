let express = require('express');
let router = express.Router();
let sqlQuery = require('../MySql/sql');
let crypto = require('crypto');
const jwt = require('jsonwebtoken');

// router.use(function(req, res, next){
//     res.append('Access-Control-Allow-Origin', '*');
//     // res.append('Access-Control-Allow-Content-Type', '*');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     next();
// })
//token私钥
const PRIVATE_KEY = 'tokenkey';
//token时效
const JWT_EXPIRED = 60*60;

//生成token
function handlejwt(key){
    const token = jwt.sign({key}, PRIVATE_KEY, {expiresIn: JWT_EXPIRED})
    return token;
}

//解析token
function analysis(token){
    return jwt.verify(token, PRIVATE_KEY)
}

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
        res.send({code:400,data:"登录失败"})
    }else{
        req.session.username = result[0].username;
        let username = result[0].username;
        let token = handlejwt(username);
        res.send({code:200,data:{token,username}})
    }
})


// 用户退出登录，注销session
router.get('/exitSession', (req, res) => {
    req.session.destroy(() => {
        res.send({code:200,data:"成功退出"})
    })
    
})

module.exports = router