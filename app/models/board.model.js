const sql = require("./db.js");

// 생성자 
const Board = function(board){
    this.title = board.title;
    this.content = board.content;
    this.writer = board.writer;
};

// board 튜플 추가 
Board.create = (newBoard, result)=>{
    sql.query("INSERT INTO board SET ?", newBoard, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created board: ",{boardno:res.insertboardNo, ...newBoard });
        result(null, {boardno: res.insertboardNo, ...newBoard});
    });
};

// boardno로 조회
Board.findById = (boardNo, result) => {
    sql.query("SELECT * FROM board WHERE boardno = ?",boardNo, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found no: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Board with the boardno
      result({ kind: "not_found" }, null);
    });
  };

// board 전체 조회
Board.getAll = result =>{
    sql.query('SELECT * FROM board', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("board: ", res);
        result(null, res);
    });
};

// boardno로 수정
Board.updateById = (boardno, board, result) => {
    sql.query(
      "UPDATE board SET title = ?, content = ?, writer = ? WHERE boardno = ?",
      [board.title, board.content, board.writer, boardno],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated boardno: ", { boardno: boardno, ...board });
        result(null, { boardno: boardno, ...board });
      }
    );
  };

// boardno로 삭제
Board.remove = (boardno, result)=>{
    sql.query("DELETE FROM board WHERE boardno = ?", boardno, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // boardno 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted boardno: ", boardno);
        result(null, res);
    });
};

// board 전체 삭제
Board.removeAll = result =>{
    sql.query('DELETE FROM board',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} board`);
        result(null, res);
    });
};

module.exports = Board;