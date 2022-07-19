module.exports = app =>{
  const countrycode = require("../controllers/countrycode.controller.js");

  // 튜플 생성
  app.post("/countrycode", countrycode.create);

  // idx로 조회
  app.get("/countrycode/:code_idx", countrycode.findOne);

  // idx로 수정
  app.put("/countrycode/:code_idx", countrycode.update);

  // idx로 삭제
  app.delete("/countrycode/:code_idx", countrycode.delete);

  // 전체 삭제
  app.delete("/countrycode", countrycode.deleteAll);
};