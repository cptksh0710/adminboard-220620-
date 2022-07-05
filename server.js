const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");

const app = express();
const home = require("./routes/home");

app.use("/", home);
app.use(express.static("app"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//로그인 세션 미들웨어 설정
app.use(session({
  key: 'sid',
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", function(request,response){
  response.render("home/index");
});

require("./app/routes/board.routes.js")(app);
require("./app/routes/code.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// 포트넘버 설정
app.listen(3000, ()=>{
    console.log("3000 port로 서버가 가동되었습니다.");
})