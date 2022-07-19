const User = require("../models/user.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const user = new User({
        name: req.body.name,
        id: req.body.id,
        password: req.body.password
    });

    // 데이터베이스에 저장
    User.create(user, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating the User."
            });
        } else{
          res.send('<script type="text/javascript"> alert("ID가 등록되었습니다"); window.location="/userlist"; </script>');
        };
    })
};

// 전체 조회 
exports.findAll = (req,res)=>{
  User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};

// user테이블 no로 조회
exports.findOne = (req,res)=>{
  User.findById(req.params.userNo, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found no ${req.params.userNo}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving no " + req.params.userNo
            });
          }
        } else res.send(data);
      });
};

// index number로 비밀번호 초기화
exports.updateNo = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateByNo(
    req.params.userNo,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `${req.params.userNo}번 회원을 찾을 수 없습니다.`
          });
        } else {
          res.status(500).send({
            message: req.params.userNo + "번 회원 초기화 오류"
          });
        }
      } else res.send('<script type="text/javascript"> alert("비밀번호가 초기화 되었습니다"); window.location="/userlist"; </script>');
    }
  );
};

// userid로 비밀번호 변경
exports.updateId = (req,res)=>{
  // Validate Request
if (!req.body) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
}

User.updateById(
  req.params.userId,
  new User(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `${req.params.userId} ID를 찾을 수 없습니다.`
        });
      } else {
        res.status(500).send({
          message: req.params.userId + " ID 비밀번호 수정 오류"
        });
      }
    } else res.send('<script type="text/javascript"> alert("비밀번호가 변경 되었습니다"); window.location="/profile"; </script>');
  }
);
};

// no로 회원 삭제
exports.delete = (req,res)=>{
  User.remove(req.params.userNo, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found No ${req.params.userNo}.`
            });
          } else {
            res.status(500).send({
              message: req.params.userNo + "번 회원을 삭제할 수 없습니다 "
            });
          }
        } else {
          res.send('<script type="text/javascript"> alert("ID가 삭제되었습니다"); window.location="/userlist"; </script>');
        }
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "삭제 오류 메시지"
          });
        else {
          res.send({ message: `All Users were deleted successfully!` });
        }
      });
};