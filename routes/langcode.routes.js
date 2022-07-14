module.exports = app =>{
  const langcode = require("../controllers/langcode.controller.js");

  // 튜플 생성
  app.post("/langcode", langcode.create);

  // 전체 조회 
  app.get("/langcode", langcode.findAll);

  // idx로 조회
  app.get("/langcode/:code_idx", langcode.findOne);

  // idx로 수정
  app.put("/langcode/:code_idx", langcode.update);

  // idx로 삭제
  app.delete("/langcode/:code_idx", langcode.delete);

  // 전체 삭제
  app.delete("/langcode", langcode.deleteAll);
};