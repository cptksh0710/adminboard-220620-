module.exports = app =>{
  const boardcode = require("../controllers/boardcode.controller.js");

  // 튜플 생성
  app.post("/boardcode", boardcode.create);

  // id로 조회
  app.get("/boardcode/:code_idx", boardcode.findOne);

  // id로 수정
  app.put("/boardcode/:code_idx", boardcode.update);

  // id로 삭제
  app.delete("/boardcode/:code_idx", boardcode.delete);

  // 전체 삭제
  app.delete("/boardcode", boardcode.deleteAll);
};