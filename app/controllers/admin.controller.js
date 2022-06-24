const Admin = require("../models/admin.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const admin = new Admin({
        no: req.body.no,
        id: req.body.id,
        password: req.body.password,
        permission: req.body.permission,
        reg_date: req.body.reg_date,
        mod_date: req.body.mod_date
    });

    // 데이터베이스에 저장
    Admin.create(admin, (err, data) =>{
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
  Admin.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};

// id로 조회
exports.findOne = (req,res)=>{
  Admin.findById(req.params.Id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found id ${req.params.Id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving title " + req.params.Id
            });
          }
        } else res.send(data);
      });
};

// id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Admin.updateById(
    req.params.Id,
    new Admin(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found title ${req.params.Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating title " + req.params.Id
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
  Admin.remove(req.params.Id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found id ${req.params.Id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete id " + req.params.Id
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  Admin.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "삭제 오류 메시지"
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
};