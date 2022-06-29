module.exports = app =>{
  const code = require("../controllers/code.controller.js");

  // 튜플 생성
  app.post("/codetable", code.create);

  // 전체 조회 
  app.get("/codetable", code.findAll);

  // id로 조회
  app.get("/codetable/:code_num", code.findOne);

  // id로 수정
  app.put("/codetable/:code_num", code.update);

  // id로 삭제
  app.delete("/codetable/:code_num", code.delete);

  // 전체 삭제
  app.delete("/codetable", code.deleteAll);
};