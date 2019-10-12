var createError = require('http-errors'); // Error Handling
var express = require('express');    //node_modules에 express 폴더에 들어 있는 index.js를 호출
var path = require('path');   //경로 관리
var cookieParser = require('cookie-parser');  //쿠키 처리
var logger = require('morgan'); //log 남겨줌

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();  // express 객체 생성

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // 어떤 view를 사용할 것인지 현재 폴더 내에 있는 view를 사용
app.set('view engine', 'ejs');  //view engine ejs를 쓰겠다. 기본값은 jade

app.use(logger('dev'));  //개발 모드 에러 메시지 볼 수 있음, product mode
app.use(express.json());  // bodyparser가 json 관련 처리를 해줌
app.use(express.urlencoded({ extended: false })); // urlencoding 해줌
app.use(cookieParser());   // 쿠키 파서
app.use(express.static(path.join(__dirname, 'public')));  // 정적인 데이터 설정 / 현재 폴더의 public

/* routing */
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
