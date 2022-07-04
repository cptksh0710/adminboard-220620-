const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");

const app = express();
const connection = require("./app/models/db")
const home = require("./routes/home");

app.use("/", home);
app.use(express.static("app"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//로그인 세션 미들웨어 설정
app.use(session({
  key: 'sid',
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", function(request,response){
  response.render("home/index");
});

//로그인 인증
app.post('/auth', function(request, response) {
	// Capture the input fields
	let userid = request.body.user_id;
	let password = request.body.password;
	// id, 비밀번호 입력을 모두 입력한 상태라면
	if (userid && password) {
		// SQL 쿼리문을 통해 입력한 로그인 유저 정보와 DB 유저 정보 일치 여부 확인
		connection.query('SELECT * FROM user WHERE id = ? AND password = ?', [userid, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// ID가 존재한다면
			if (results.length > 0) {
				// 인증된 유저
				request.session.loggedin = true;
				request.session.userid = userid;
				// 메인화면으로 Redirect
				response.redirect('/dashboard');
			} else {
				response.send('ID 또는 비밀번호가 일치하지 않습니다.');
			}			
			response.end();
		});
	} else {
		response.send('ID와 비밀번호를 입력해 주세요.');
		response.end();
	}
});

require("./app/routes/board.routes.js")(app);
require("./app/routes/code.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// 포트넘버 설정
app.listen(3000, ()=>{
    console.log("3000 port로 서버가 가동되었습니다.");
})