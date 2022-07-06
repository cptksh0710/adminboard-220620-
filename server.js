const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const home = require("./routes/home");
const PORT = process.env.PORT || 3000

var session = require('express-session');
var passport = require('./app/config/passport.js');

app.use("/", home);
app.use(express.static("app"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//로그인 세션 미들웨어 설정
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize()); //passport 초기화
app.use(passport.session());	//passport와 session 연결
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", function(request,response){
  response.render("home/index");
});

require("./app/routes/board.routes.js")(app);
require("./app/routes/code.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// 포트넘버 설정
app.listen(PORT, ()=>{
    console.log(`${PORT} 포트로 서버가 가동되었습니다.`);
})