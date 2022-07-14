const sql = require("./db.js");

// 생성자 
const Langcode = function(langcode){
    this.code_idx = langcode.code_idx;
    this.name = langcode.name;
    this.code = langcode.code;
};

// 사용자 튜플 추가 
Langcode.create = (newlangCode, result)=>{
    sql.query("INSERT INTO langcode SET ?", newlangCode, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("생성된 코드 인덱스번호: ",{code_idx:res.insertcode_Idx, ...newlangCode});
        result(null, {code_idx: res.insertcode_Idx, ...newlangCode});
    });
};

// 사용자 code_idx로 조회
Langcode.findById = (code_idx, result) => {
    sql.query(`SELECT * FROM langcode WHERE code_idx = ${code_idx}`, (err, res) => {
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
Langcode.getAll = result =>{
    sql.query('SELECT * FROM langcode', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("언어 코드: ", res);
        result(null, res);
    });
};

// code_idx로 수정
Langcode.updateById = (code_idx, langcode, result) => {
    sql.query(
      "UPDATE langcode SET name = ?, code = ? WHERE code_idx = ?",
      [langcode.name, langcode.code, code_idx],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found code_num
          result({ kind: "찾을 수 없습니다" }, null);
          return;
        }
  
        console.log("수정된 언어 코드: ", { code_idx: code_idx, ...langcode });
        result(null, { code_idx: code_idx, ...langcode });
      }
    );
  };

// code_idx로 삭제
Langcode.remove = (code_idx, result)=>{
    sql.query('DELETE FROM langcode WHERE code_idx = ?',code_idx, (err, res)=>{
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
Langcode.removeAll = result =>{
    sql.query('DELETE FROM langcode',(err, res)=>{
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

module.exports = Langcode;