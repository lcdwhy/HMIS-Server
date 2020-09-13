let mysql = require('mysql');

let options = {
    host: "localhost",
    user: 'root',
    password: "931366912",
    database: "后台管理系统"
}

let con = mysql.createConnection(options);

con.connect((err) => {
    if(err){
        console.log("连接失败")
    }else{
        console.log("连接成功")
    }
})

function sqlQuery(strSql, arr){
    return new Promise(function(resolve, reject){
        con.query(strSql, arr, (err, results) => {
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery;