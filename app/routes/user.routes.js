module.exports = app =>{
  const connection = require("../models/db.js")
  const user = require("../controllers/user.controller.js");

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
          response.send('<script type="text/javascript"> alert("ID 또는 비밀번호가 일치하지 않습니다."); window.location="/"; </script>');
        }			
        response.end();
      });
    } else {
      response.send('ID와 비밀번호를 입력해 주세요.');
      response.end();
    }
  });

  // 튜플 생성
  app.post("/user", user.create);

  // 전체 조회 
  app.get("/user", user.findAll);

  // admin테이블 no로 조회
  app.get("/user/:userNo", user.findOne);

  // admin테이블 no로 수정
  app.put("/user/:userNo", user.update);

  // admin테이블 no로 삭제
  app.delete("/user/:userNo", user.delete);

  // 전체 삭제
  app.delete("/user", user.deleteAll);
};