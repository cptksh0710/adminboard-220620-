var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');
const connection = require('../models/db.js');

// serialize & deserialize User // 2
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, id);
});

// local strategy // 3
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'user_id', 
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, user_id, password, done) { 
      if (user_id && password) {
        // SQL 쿼리문을 통해 입력한 로그인 유저 정보와 DB 유저 정보 일치 여부 확인
        connection.query('SELECT * FROM user WHERE id = ? AND password = ?', [user_id, password], function(error, results, fields) {
          // 쿼리문 에러 발생 시 에러 출력
          if (error) throw error;
          // ID가 존재한다면
          if (results.length > 0) {
            // 인증된 유저
            return done(null, {id: user_id, password: password});
          } else {
              req.flash("errors", {login:"ID 또는 비밀번호가 일치하지 않습니다."});
            //res.send('<script type="text/javascript"> alert("ID 또는 비밀번호가 일치하지 않습니다."); window.location="/"; </script>');
            return done(null, false);
          }			
        });
      } else {
        //res.send('<script type="text/javascript"> alert("ID와 비밀번호를 입력해 주세요."); window.location="/"; </script>');
        return done(null, false);
      }
    }
  )
);

module.exports = passport;