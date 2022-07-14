const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const home = require("./routes/home");
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override'); //REST API PUT,DELETE 관련 미들웨어
var path = require("path");

const connection = require("./models/db.js");

var session = require('express-session'); //session 관련 미들웨어
const MemoryStore = require('memorystore')(session);
var passport = require('./config/passport.js'); //로그인 인증, session 관련 미들웨어

const fs = require('fs');

const maxAge = 1000 * 60 * 60 * 12; //12시간

// 현재 시각명 파일 이름 추가 관련
const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const hours = ('0' + date.getHours()).slice(-2);
const minutes = ('0' + date.getMinutes()).slice(-2);
const seconds = ('0' + date.getSeconds()).slice(-2);
const dayfolder = year + '_' + month + '_' + day;
const dateStr = year + '_' + month + '_' + day + '__' + hours + '_' + minutes + '_' + seconds + '_';

app.use("/", home);
app.use(express.static("assets"));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//로그인 세션 미들웨어 설정
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: maxAge})
}));

/*
app.use(passport.initialize()); //passport 초기화
app.use(passport.session());	//passport와 session 연결
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});
*/
// 자바스크립트 html 뷰 관련 엔진 로드
app.set("views", "./views");
app.set("view engine", "ejs");

//로그인 인증
app.post('/auth', function(req, res) {
  // 로그인 페이지에서 입력 받은 정보 저장
  let userid = req.body.user_id;
  let password = req.body.password;
  // id, 비밀번호 입력을 모두 입력한 상태라면
  if (userid && password) {
    // SQL 쿼리문을 통해 입력한 로그인 유저 정보와 DB 유저 정보 일치 여부 확인
    connection.query('SELECT * FROM user WHERE id = ? AND password = ?', [userid, password], function(error, results, fields) {
      // 쿼리문 에러 발생 시 에러 출력
      if (error) throw error;
      // ID가 존재한다면
      if (results.length > 0) {
        // 인증된 유저
        req.session.loggedin = true;
        req.session.userid = userid;
        //res.send(req.session);
        // 메인화면으로 Redirect
        res.redirect('/dashboard');
      } else {
        res.send('<script type="text/javascript"> alert("ID 또는 비밀번호가 일치하지 않습니다."); window.location="/"; </script>');
      }			
      res.end();
    });
  } else {
    res.send('<script type="text/javascript"> alert("ID와 비밀번호를 입력해 주세요."); window.location="/"; </script>');
    res.end();
  }
});

app.get('/auth', (req,res) =>{
  console.log(req.session.user_id);
  if(req.session.userid){
      res.send({loggedIn : true, userid: req.session.userid});
  }else{
      res.send({loggedIn : false});
  }
});

// 로그아웃
app.post('/logout', (req, res) => { 
  req.session.destroy();
  res.redirect('/');
});

//passport 로그아웃 관련
/*
router.get('/logout', function(reqeust, response) {
  reqeust.logout();
  response.redirect('/');
});*/

app.get("/dashboard", function(req, res){
  MemoryStore.get(req.session.userid, function(err, data) {
    res.send({err: err, data:data});
  });
});

// DB 테이블 데이터 CRUD API 호출 라우터 경로 관련 설정 파일들 로드 
require("./routes/boardcode.routes.js")(app);
require("./routes/countrycode.routes.js")(app);
require("./routes/langcode.routes.js")(app);
require("./routes/user.routes.js")(app);

// 포트넘버 설정
app.listen(PORT, ()=>{
  const dir1 = "./uploads/";
  const dir2 = `./uploads/${dayfolder}`;

  if (!fs.existsSync(dir1)) fs.mkdirSync(dir1); //dir1 디렉토리가 없으면 서버 시작시 생성
  if (!fs.existsSync(dir2)) fs.mkdirSync(dir2); //dir2 디렉토리가 없으면 서버 시작시 생성
  
  console.log(`${PORT} 포트로 서버가 가동되었습니다.`);
})