module.exports = app =>{
  const code = require("../controllers/code.controller.js");

  // 튜플 생성
  app.post("/code", code.create);

  // 전체 조회 
  app.get("/code", code.findAll);

  // id로 조회
  app.get("/code/:code_num", code.findOne);

  // id로 수정
  app.put("/code/:code_num", code.update);

  // id로 삭제
  app.delete("/code/:code_num", code.delete);

  // 전체 삭제
  app.delete("/code", code.deleteAll);
};