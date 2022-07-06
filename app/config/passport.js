var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');

// serialize & deserialize User // 2
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({_id:id}, function(err, user) {
    done(err, user);
  });
});

// local strategy // 3
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'user_id', 
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, user_id, password, done) { // 3-2
      User.findOne({id:user_id})
        .select({password:1})
        .exec(function(err, user) {
          if (err) return done(err);

          if (user && user.authenticate(password)){ // 3-3
            return done(null, user);
          }
          else {
            req.flash('id', user_id);
            req.flash('errors', {login:'ID 또는 비밀번호가 일치하지 않습니다.'});
            return done(null, false);
          }
        });
    }
  )
);

module.exports = passport;