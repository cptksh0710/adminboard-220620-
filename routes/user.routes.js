module.exports = app =>{
  const user = require("../controllers/user.controller.js");

  // 튜플 생성
  app.post("/user", user.create);

  app.post("/user/delete", function(req,res){
    let num = req.body.userno;
    console.log(num);
  });

  // 전체 조회 
  app.get("/user", user.findAll);

  // user테이블 no로 조회
  app.get("/user/:userNo", user.findOne);

  // user테이블 no로 수정(비밀번호 초기화)
  app.put("/user/:userNo", user.update);

  // user테이블 no로 회원 삭제
  app.delete("/user/:userNo", user.delete);

  // 전체 삭제
  app.delete("/user", user.deleteAll);
};