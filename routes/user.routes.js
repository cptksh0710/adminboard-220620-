module.exports = app =>{
  const user = require("../controllers/user.controller.js");

  // 튜플 생성
  app.post("/user", user.create);

  // 전체 조회 
  app.get("/user", user.findAll);

  // user테이블 no로 조회
  app.get("/user/:userNo", user.findOne);

  // user테이블 index number로 비밀번호 초기화
  app.put("/user/:userNo", user.updateNo);

  // user테이블 no로 회원 삭제
  app.delete("/user/:userNo", user.delete);

  // user테이블 userid로 비밀번호 변경
  app.put("/userid/:userId", user.updateId);

  // 전체 삭제
  app.delete("/user", user.deleteAll);
};