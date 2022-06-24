module.exports = app =>{
  const admin = require("../controllers/admin.controller.js");

  // 튜플 생성
  app.post("/admin", admin.create);

  // 전체 조회 
  app.get("/admin", admin.findAll);

  // id로 조회
  app.get("/admin/:id", admin.findOne);

  // id로 수정
  app.put("/admin/:id", admin.update);

  // id로 삭제
  app.delete("/admin/:id", admin.delete);

  // 전체 삭제
  app.delete("/admin", admin.deleteAll);
};