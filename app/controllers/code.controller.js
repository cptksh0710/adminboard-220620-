const Code = require("../models/code.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const code = new Code({
        no: req.body.no,
        code_group: req.body.code_group,
        code_num: req.body.code_num,
        code_name: req.body.code_name
    });

    // 데이터베이스에 저장
    Code.create(code, (err, data) =>{
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
  Code.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};

// code_num로 조회
exports.findOne = (req,res)=>{
  Code.findById(req.params.Code_num, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found id ${req.params.Code_num}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving title " + req.params.Code_num
            });
          }
        } else res.send(data);
      });
};

// code_num로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Code.updateById(
    req.params.Code_num,
    new Code(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found code ${req.params.Code_num}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating code " + req.params.Code_num
          });
        }
      } else res.send(data);
    }
  );
};

// code_num로 삭제
exports.delete = (req,res)=>{
  Code.remove(req.params.Code_num, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found code ${req.params.Code_num}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete code " + req.params.Code_num
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  Code.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "삭제 오류 메시지"
          });
        else res.send({ message: `All Codes were deleted successfully!` });
      });
};