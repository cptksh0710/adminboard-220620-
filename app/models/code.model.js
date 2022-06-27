const sql = require("./db.js");

// 생성자 
const Code = function(code){
    this.no = code.no;
    this.code_group = code.code_group;
    this.code_num = code.code_num;
    this.code_name = code.code_name;
};

// 사용자 튜플 추가 
Code.create = (newCode, result)=>{
    sql.query("INSERT INTO code SET ?", newCode, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created contents: ",{id:res.insertCode_num, ...newCode});
        result(null, {code_num: res.insertCode_num, ...newCode});
    });
};

// 사용자 code_num로 조회
Code.findById = (code_num, result) => {
    sql.query(`SELECT * FROM code WHERE code_num = ${code_num}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found code: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the code_num
      result({ kind: "not_found" }, null);
    });
  };

// code_num 전체 조회
Code.getAll = result =>{
    sql.query('SELECT * FROM code', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("code: ", res);
        result(null, res);
    });
};

// code_num로 수정
Code.updateById = (code_num, code, result) => {
    sql.query(
      "UPDATE code SET no = ?, code_group = ?, code_name = ? WHERE code_num = ?",
      [code.no, code.code_group, code.code_name, code.code_num],
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
  
        console.log("updated code_num: ", { code_num: code_num, ...code });
        result(null, { code_num: code_num, ...code });
      }
    );
  };

// code_num로 삭제
Code.remove = (code_num, result)=>{
    sql.query('DELETE FROM code WHERE code_num = ?',code_num, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // code_num 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted code_num: ", code_num);
        result(null, res);
    });
};

// 코드 전체 삭제
Code.removeAll = result =>{
    sql.query('DELETE FROM code',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // code 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} code`);
        result(null, res);
    });
};

module.exports = Code;