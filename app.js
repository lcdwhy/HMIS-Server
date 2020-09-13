var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入session模块
var session = require('express-session');
// 引入上传模块
var multer = require('multer');
// 配置上传对象
var upload = multer({dest: './public/upload'});
// 引入加密模块
let crypto = require('crypto');
// 引入前台路由模块
var indexRouter = require('./routes/index');
// 引入后台路由模块
var adminRouter = require('./routes/admin/adminRouter')
// 引入登录模块
var loginRouter = require('./routes/login');
// 引入注册模块
var registerRouter = require('./routes/register');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

// 设置session
app.use(session({
  secret: 'xzsagiasoigjasoi',//强制保存session
  resave: true,
  cookie: {
    maxAge: 7*24*60*60*1000 //保存时间为一周
  },
  saveUninitialized: true //保存初始化的session
}))
// 开发跨域
// app.use(function(req, res, next){
//   res.append('Access-Control-Allow-Origin', '*');
//   res.append('Access-Control-Allow-Content-Type', '*');
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   // res.header("Access-Control-Allow-Methods","POST,GET");
//   next();
// })



// 前台路由
app.use('/', indexRouter);
// 后台路由
app.use('/admin', adminRouter)
// 登录路由
app.use('/login', loginRouter);
// 注册路由
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
