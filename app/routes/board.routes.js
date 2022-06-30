module.exports = app =>{
    const board = require("../controllers/board.controller.js");

    // 튜플 생성
    app.post("/board", board.create);

    // 전체 조회 
    app.get("/board", board.findAll);

    // boardno로 조회
    app.get("/board/:boardNo", board.findOne);

    // boardno로 수정
    app.put("/board/:boardNo", board.update);

    // boardno로 삭제
    app.delete("/board/:boardNo", board.delete);

    // 전체 삭제
    app.delete("/board", board.deleteAll);
};