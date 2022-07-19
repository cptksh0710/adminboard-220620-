const express = require("express");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const app = express();

const home = require("./routes/home");
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override"); //REST API PUT,DELETE 관련 미들웨어
var path = require("path");

const session = require("express-session"); //session 관련 미들웨어
const passport = require("./config/passport.js"); //로그인 인증, session 관련 미들웨어
const FileStore = require('session-file-store')(session);

const fs = require("fs");

const maxAge = 1000 * 60 * 60 * 12; //12시간

// 현재 시각명 파일 이름 추가 관련
const date = new Date();
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);
const dayfolder = year + "_" + month + "_" + day;

app.use("/", home);
app.use(express.static("assets"));
app.use(methodOverride("_method"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

//로그인 세션 미들웨어 설정
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
  })
);

/*
app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); //passport와 session 연결
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});*/

// 자바스크립트 html 뷰 관련 엔진 로드
app.set("views", "./views");
app.set("view engine", "ejs");

// DB 테이블 데이터 CRUD API 호출 라우터 경로 관련 설정 파일들 로드
require("./routes/boardcode.routes.js")(app);
require("./routes/countrycode.routes.js")(app);
require("./routes/langcode.routes.js")(app);
require("./routes/user.routes.js")(app);
// 로그인 인증 관련
require("./routes/auth.routes.js")(app);

// 포트넘버 설정
app.listen(PORT, () => {
  const dir1 = "./uploads/";
  const dir2 = `./uploads/${dayfolder}`;

  if (!fs.existsSync(dir1)) fs.mkdirSync(dir1); //dir1 디렉토리가 없으면 서버 시작시 생성
  if (!fs.existsSync(dir2)) fs.mkdirSync(dir2); //dir2 디렉토리가 없으면 서버 시작시 생성

  console.log(`${PORT} 포트로 서버가 가동되었습니다.`);
});
