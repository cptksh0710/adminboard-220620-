const sql = require("./db.js");

// 생성자 
const Boardcode = function(boardcode){
    this.code_idx = boardcode.code_idx;
    this.name = boardcode.name;
    this.code = boardcode.code;
};

// 사용자 튜플 추가 
Boardcode.create = (newboardCode, result)=>{
    sql.query("INSERT INTO boardcode SET ?", newboardCode, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("생성된 코드 인덱스번호: ",{id:res.insertcode_Idx, ...newboardCode});
        result(null, {code_idx: res.insertcode_Idx, ...newboardCode});
    });
};

// 사용자 code_idx로 조회
Boardcode.findById = (code_idx, result) => {
    sql.query(`SELECT * FROM boardcode WHERE code_idx = ${code_idx}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("발견한 코드: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // 데이터가 없다면
      result({ kind: "찾을 수 없습니다" }, null);
    });
  };

// code_num 전체 조회
Boardcode.getAll = result =>{
    sql.query('SELECT * FROM boardcode', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("게시판 코드: ", res);
        result(null, res);
    });
};

// code_idx로 수정
Boardcode.updateById = (code_idx, boardcode, result) => {
    sql.query(
      "UPDATE boardcode SET name = ?, code = ? WHERE code_idx = ?",
      [boardcode.name, boardcode.code, code_idx],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found code_num
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("수정된 게시판 코드: ", { code_idx: code_idx, ...boardcode });
        result(null, { code_idx: code_idx, ...boardcode });
      }
    );
  };

// code_idx로 삭제
Boardcode.remove = (code_idx, result)=>{
    sql.query('DELETE FROM boardcode WHERE code_idx = ?',code_idx, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // code_idx 결과가 없을 시 
            result({kind: "찾을 수 없습니다"}, null);
            return;
        }

        console.log("삭제된 코드 인덱스번호: ", code_idx);
        result(null, res);
    });
};

// 코드 전체 삭제
Boardcode.removeAll = result =>{
    sql.query('DELETE FROM boardcode',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // code 결과가 없을 시 
            result({kind: "찾을 수 없습니다"}, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} code`);
        result(null, res);
    });
};

module.exports = Boardcode;