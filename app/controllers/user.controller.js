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

// no로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.userNo,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found No ${req.params.userNo}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating title " + req.params.userNo
          });
        }
      } else res.send(data);
    }
  );
};

// no로 삭제
exports.delete = (req,res)=>{
  User.remove(req.params.userNo, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found No ${req.params.userNo}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete No " + req.params.userNo
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
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
        else res.send({ message: `All Users were deleted successfully!` });
      });
};