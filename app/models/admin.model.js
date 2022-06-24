const sql = require("./db.js");

// 생성자 
const Admin = function(admin){
    this.no = admin.no;
    this.id = admin.id;
    this.password = admin.password;
    this.permission = admin.permission;
    this.reg_date = admin.reg_date;
    this.mod_date = admin.mod_date;
};

// 사용자 튜플 추가 
Admin.create = (newAdmin, result)=>{
    sql.query("INSERT INTO board SET ?", newAdmin, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created contents: ",{id:res.insertId, ...newAdmin });
        result(null, {id: res.insertId, ...newAdmin});
    });
};

// 사용자 id로 조회
Admin.findById = (Id, result) => {
    sql.query(`SELECT * FROM admin WHERE id = ${Id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found id: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

// 사용자 전체 조회
Admin.getAll = result =>{
    sql.query('SELECT * FROM admin', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("admin: ", res);
        result(null, res);
    });
};

// 사용자 id로 수정
Admin.updateById = (id, admin, result) => {
    sql.query(
      "UPDATE admin SET no = ?, password = ?, permission = ?, reg_date = ?, mod_date = ? WHERE id = ?",
      [admin.no, admin.password, admin.permission, admin.reg_date, admin.reg_date, id],
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
  
        console.log("updated id: ", { id: id, ...admin });
        result(null, { id: id, ...admin });
      }
    );
  };

// 사용자 id로 삭제
Admin.remove = (id, result)=>{
    sql.query('DELETE FROM admin WHERE id = ?',id, (err, res)=>{
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

        console.log("deleted id: ", id);
        result(null, res);
    });
};

// 사용자 전체 삭제
Admin.removeAll = result =>{
    sql.query('DELETE FROM admin',(err, res)=>{
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

        console.log(`deleted ${res.affectedRows} admin`);
        result(null, res);
    });
};

module.exports = Admin;