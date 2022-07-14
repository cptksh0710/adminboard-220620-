"use strict"; // 엄격 모드 / 디버깅이 쉬워지고 발생 가능한 에러들을 예방

var express = require('express');
var router = express.Router();
var ctrl = require('./home.ctrl');
var passport = require('../../config/passport.js');
var multer = require('multer');
var fs = require('fs');

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

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, `uploads/${dayfolder}`)
  },
  filename:  (req, file, cb) => {
    cb(null, dateStr + file.originalname)// 파일 원본이름 저장
  }
})

const upload = multer({ storage: storage }); // 파일 업로드 미들웨어 생성

// 페이지 라우팅 설정
router.get("/", ctrl.start);
router.get("/dashboard", ctrl.dashboard);
router.get("/profile", ctrl.profile);
router.get("/userlist", ctrl.userlist);
router.get("/user_reg", ctrl.userreg);
router.get("/import", ctrl.dataimport);
router.get("/boardcode", ctrl.boardcode);
router.get("/countrycode", ctrl.countrycode);
router.get("/langcode", ctrl.langcode);
router.get("/boardcode_reg", ctrl.boardcodereg);
router.get("/boardcode_edit", ctrl.boardcodeedit);
router.get("/countrycode_reg", ctrl.countrycodereg);
router.get("/countrycode_edit", ctrl.countrycodeedit);
router.get("/langcode_reg", ctrl.langcodereg);
router.get("/langcode_edit", ctrl.langcodeedit);

//로그인(passport 활용 참고코드)
router.post('/', function(request,response,next){
    var errors = {};
    var isValid = true;

    if(!request.body.user_id){
      isValid = false;
      errors.user_id = 'ID를 입력해주세요.';
    }
    if(!request.body.password){
      isValid = false;
      errors.password = 'Password를 입력해주세요.';
    }

    if(isValid){
      next();
    }
    else {
      request.flash('errors',errors);
      response.redirect('/');
    }
  },
  passport.authenticate('local-login', {
    successRedirect : '/auth',
    failureRedirect : '/'
  }
));

//passport 로그아웃 관련
/*
router.get('/logout', function(reqeust, response) {
  reqeust.logout();
  response.redirect('/');
});*/

// 단일 파일 업로드
router.post('/singlepart', upload.single('attachment'), (req, res, next) => {
  res.status(201).send({
      message: "저장 성공",
      fileInfo: req.file
  })
});

// 다중 파일 업로드
router.post('/multipart', upload.array('attachments'), (req, res, next) => {
  var formjson = req.body;

  fs.writeFile(`uploads/${dayfolder}/${dateStr}_content.json`,  JSON.stringify(formjson),function(err){
    if (err === null) {
        console.log('form-data json 생성');
    } else {
        console.log('form-data json 실패');
    }
  });

  for(var i=0; i<req.files.length; i++){
    var fdata = req.files[i];
    console.log(fdata);

    fs.writeFile(`uploads/${dayfolder}/${dateStr}_file${i+1}.json`,  JSON.stringify(fdata),function(err){
      if (err === null) {
          console.log('file json 생성');
      } else {
          console.log('file json 실패');
      }
    });
  }

  res.send('<script type="text/javascript"> alert("파일이 등록되었습니다"); window.location="/import"; </script>');
});

module.exports = router;