"use strict"; // 엄격 모드 / 디버깅이 쉬워지고 발생 가능한 에러들을 예방한다.

const express = require("express");
const router = express.Router();
const db = require('../../app/models/db.js');
const ctrl = require("./home.ctrl");

// 페이지 라우팅 설정
router.get("/", ctrl.start);
router.get("/register", ctrl.register);
router.get("/dashboard", ctrl.dashboard);
router.get("/profile", ctrl.profile);
router.get("/userlist", function(req,res,next){
  var sql = "SELECT no, name, id, password, permission, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date, "+
            " date_format(mod_date,'%Y-%m-%d %H:%i:%s') mod_date from user;";
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('home/userlist', { title: 'User List', userData: data});
  });
});
router.get("/user_reg", ctrl.userreg);
router.get("/import", ctrl.dataimport);
router.get("/code", ctrl.code);
router.get("/code_reg", ctrl.codereg);
router.get("/export", ctrl.dataexport);
router.get("/datalist", ctrl.datalist);

// 로그아웃
/*
router.get('/logout', function (request, response) { 
  request.session.destroy(function(err){ 
    response.clearCookie("sid");
    response.redirect('/'); 
  });
 }); */

/*
router.get('/logout', function (req, res) { 
  req.session.destroy(() => { 
    res.clearCookie("sid");
    res.redirect('/'); 
  });
});*/

router.get("/logout", async function (req, res, next) {
  var session = req.session;
  try {
    if (session.userid) {
      //세션정보가 존재하는 경우
      await req.session.destroy(function (err) {
        if (err) console.log(err);
        else {
          res.redirect("/");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
  res.clearCookie("sid");
  res.redirect("/");
});

module.exports = router;