module.exports = app =>{
  const db = require("../models/db.js");

  // 페이지 라우팅
  // view는 /views/home 디렉토리 내의 ejs파일(기존 html)들을 렌더링

  // 로그인 페이지(시작 페이지)
  app.get("/", function(req, res, next) {
    res.render("home/index");
  });

    //로그인 인증
  app.post('/auth', function(req, res) {
    // 로그인 페이지에서 입력 받은 정보 저장
    let userid = req.body.user_id;
    let password = req.body.password;
    // id, 비밀번호 입력을 모두 입력한 상태라면
    if (userid && password) {
      // SQL 쿼리문을 통해 입력한 로그인 유저 정보와 DB 유저 정보 일치 여부 확인
      db.query('SELECT * FROM user WHERE id = ? AND password = ?', [userid, password], function(error, results, fields) {
        // 쿼리문 에러 발생 시 에러 출력
        if (error) throw error;
        // ID가 존재한다면
        if (results.length > 0) {
          // 인증된 유저
          req.session.loggedin = true;
          req.session.userid = userid;
          // 로그인 유저 정보 세션 저장
          var username;
          var userperm;
          for (var data of results){
            username = data.name;
            userperm = data.permission;
          };
          req.session.name = username;
          req.session.permission = userperm;

          // 세션에 저장 후 메인화면으로 Redirect
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

  // 로그아웃
  app.get('/logout', (req, res) => { 
    req.session.destroy();
    res.redirect('/');
  });

  // 프로필 페이지(라우팅 및 세션 데이터 로드)
  app.get('/profile', function(req, res, next) {
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render('home/profile', { session: sess });
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  // 프로필 비밀번호 변경 관련 비밀번호 체크
  app.post('/pass_check', function(req, res, next) {
    var password = req.body.password;
    var check = req.body.pass_check;

    res.render('home/profile', { session: sess });
  });

  //사용자 목록 페이지(관리자 권한)
  app.get("/userlist", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;
    var permission = sess.permission;

    if(logincheck === true){
      if(permission === 9){
        var sql = "SELECT no, name, id, password, permission, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date, "+
              " date_format(mod_date,'%Y-%m-%d %H:%i:%s') mod_date from user;";
        db.query(sql, function (err, data, fields) {
          if (err) throw err;
          res.render('home/userlist', { title: 'User List', userData: data});
        });
      } else {
        res.send('<script type="text/javascript"> alert("관리자만 접근할 수 있습니다."); window.location="/dashboard"; </script>');
      }
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //사용자 등록 페이지(관리자 권한)
  app.get("/user_reg", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;
    var permission = sess.permission;

    if(logincheck === true){
      if(permission === 9){
        res.render("home/user_reg");
      } else {
        res.send('<script type="text/javascript"> alert("관리자만 접근할 수 있습니다."); window.location="/dashboard"; </script>');
      }
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

   //대쉬보드 페이지(메인 페이지)
  app.get("/dashboard", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/dashboard");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

   //자료등록 페이지
  app.get("/import", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      var sql1 = "SELECT name, code from boardcode;";
      var sql2 = "SELECT name, code from countrycode;";
      var sql3 = "SELECT name, code from langcode; ";
  
      db.query(sql1, (err, data1, fields) => {
          if (err) throw err;
          db.query(sql2, (err, data2, fields) => {
              if (err) throw err;
              db.query(sql3, (err, data3, fields) => {
                  if (err) throw err;
                  res.render('home/import', {boardCode:data1, countryCode:data2, langCode:data3});
              });
          });
      });
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  /*================코드관리 페이지================*/
  //게시판 코드
  app.get("/boardcode", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      var sql = "SELECT code_idx, name, code,  date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date from boardcode;";
      db.query(sql, function (err, data, fields) {
          if (err) throw err;
          res.render('home/boardcode', {title: 'Board Code', boardCode: data});
      });
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  // 게시판 코드 등록
  app.get("/boardcode_reg", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/boardcode_reg");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  // 게시판 코드 수정
  app.get("/boardcode_edit", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/boardcode_edit");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //국가 코드
  app.get("/countrycode", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      var sql = "SELECT code_idx, name, code, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date from countrycode;";
      db.query(sql, function (err, data, fields) {
          if (err) throw err;
          res.render('home/countrycode', { title: 'Country Code', countryCode: data});
      });
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //국가 코드 등록
  app.get("/countrycode_reg", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/countrycode_reg");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //국가 코드 수정
  app.get("/countrycode_edit", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/countrycode_edit");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //언어 코드
  app.get("/langcode", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      var sql = "SELECT code_idx, name, code, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date from langcode;";
      db.query(sql, function (err, data, fields) {
          if (err) throw err;
          res.render('home/langcode', { title: 'Language Code', langCode: data});
      });
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //언어 코드 등록
  app.get("/langcode_reg", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/langcode_reg");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

  //언어 코드 수정
  app.get("/langcode_edit", function(req, res, next){
    var sess = req.session;
    var logincheck = sess.loggedin;

    if(logincheck === true){
      res.render("home/langcode_edit");
    } else {
      res.send('<script type="text/javascript"> alert("로그인이 필요합니다."); window.location="/"; </script>');
    }
  });

/*
  //passport 로그아웃 관련
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    //logout한 상태를 session에 저장
    req.session.save((err) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});
*/
  /*
  //passport 로그인 인증
  app.post(
    "/auth",
    function (request, response, next) {
      var errors = {};
      var isValid = true;

      if (!request.body.user_id) {
        isValid = false;
        errors.user_id = "ID를 입력해주세요.";
      }
      if (!request.body.password) {
        isValid = false;
        errors.password = "Password를 입력해주세요.";
      }

      if (isValid) {
        next();
      } else {
        //request.flash('errors',errors);
        response.redirect("/");
      }
    },
    passport.authenticate("local-login", {
      successRedirect: "/dashboard",
      failureRedirect: "/"
    })
  );
*/
};