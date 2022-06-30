const sql = require("./db.js");

// 생성자
const User = function (user) {
  this.name = user.name;
  this.id = user.id;
  this.password = user.password;
};

// 사용자 튜플 추가
User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created user: ", { no: res.insertNo, ...newUser });
    result(null, { no: res.insertNo, ...newUser });
  });
};

// 사용자 no로 조회
User.findById = (userNo, result) => {
  sql.query("SELECT * FROM user WHERE no = ?", userNo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // 결과가 없을 시
    result({ kind: "not_found" }, null);
  });
};

// 사용자 전체 조회
User.getAll = (result) => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

// 사용자 no로 수정
User.updateById = (no, user, result) => {
  sql.query(
    "UPDATE user SET name = ?, id = ?, password = ? WHERE no = ?",
    [user.name, user.id, user.password, no],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // 결과가 없을 시
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated no: ", { no: no, ...user });
      result(null, { no: no, ...user });
    }
  );
};

// 사용자 no로 삭제
User.remove = (no, result) => {
  sql.query("DELETE FROM user WHERE no = ?", no, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // 결과가 없을 시
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted no: ", no);
    result(null, res);
  });
};

// 사용자 전체 삭제
User.removeAll = (result) => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // 결과가 없을 시
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ${res.affectedRows} user");
    result(null, res);
  });
};

module.exports = User;
