const sql = require("./db.js");

// 생성자 
const Countrycode = function(countrycode){
  this.code_idx = countrycode.code_idx;
  this.name = countrycode.name;
  this.code = countrycode.code;
};

// 사용자 튜플 추가 
Countrycode.create = (newcountryCode, result)=>{
    sql.query("INSERT INTO countrycode SET ?", newcountryCode, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("생성된 코드 인덱스번호: ",{code_idx:res.insertcode_Idx, ...newcountryCode});
        result(null, {code_idx: res.insertcode_Idx, ...newcountryCode});
    });
};

// 사용자 code_idx로 조회
Countrycode.findById = (code_idx, result) => {
    sql.query(`SELECT * FROM countrycode WHERE code_idx = ${code_idx}`, (err, res) => {
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
Countrycode.getAll = result =>{
    sql.query('SELECT * FROM countrycode', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("국가 코드: ", res);
        result(null, res);
    });
};

// code_idx로 수정
Countrycode.updateById = (code_idx, countrycode, result) => {
    sql.query(
      "UPDATE langcode SET name = ?, code = ? WHERE code_idx = ?",
      [countrycode.name, countrycode.code, code_idx],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found code_idx
          result({ kind: "찾을 수 없습니다" }, null);
          return;
        }
  
        console.log("수정된 국가 코드: ", { code_idx: code_idx, ...countrycode });
        result(null, { code_idx: code_idx, ...countrycode });
      }
    );
  };

// code_idx로 삭제
Countrycode.remove = (code_idx, result)=>{
    sql.query('DELETE FROM countrycode WHERE code_idx = ?',code_idx, (err, res)=>{
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
Countrycode.removeAll = result =>{
    sql.query('DELETE FROM countrycode',(err, res)=>{
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

module.exports = Countrycode;