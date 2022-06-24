module.exports = app =>{
    const board = require("../controllers/board.controller.js");

    // 튜플 생성
    app.post("/board", board.create);

    // 전체 조회 
    app.get("/board", board.findAll);

    // title로 조회
    app.get("/board/:title", board.findOne);

    // title로 수정
    app.put("/board/:title", board.update);

    // title로 삭제
    app.delete("/board/:title", board.delete);

    // 전체 삭제
    app.delete("/board", board.deleteAll);
};