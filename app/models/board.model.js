const sql = require("./db.js");

// 생성자 
const Board = function(board){
    this.no = board.boardno;
    this.title = board.title;
    this.content = board.content;
    this.writer = board.writer;
};

// customer 튜플 추가 
Board.create = (newBoard, result)=>{
    sql.query("INSERT INTO board SET ?", newBoard, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created contents: ",{id:res.insertTitle, ...newBoard });
        result(null, {id: res.inseertTitle, ...newBoard});
    });
};

// customer id로 조회
Board.findById = (Title, result) => {
    sql.query(`SELECT * FROM board WHERE title = ${Title}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found title: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

// customer 전체 조회
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

// customer id로 수정
Board.updateById = (title, board, result) => {
    sql.query(
      "UPDATE board SET no = ?, content = ?, writer = ? WHERE title = ?",
      [board.no, board.content, board.writer, title],
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
  
        console.log("updated title: ", { title: title, ...board });
        result(null, { title: title, ...board });
      }
    );
  };

// customer id로 삭제
Board.remove = (id, result)=>{
    sql.query('DELETE FROM board WHERE title = ?',title, (err, res)=>{
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

        console.log("deleted title: ", title);
        result(null, res);
    });
};

// customer 전체 삭제
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