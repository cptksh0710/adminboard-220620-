module.exports = app =>{
  const user = require("../controllers/user.controller.js");

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