const Boardcode = require("../models/boardcode.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Code can not be empty!"
        });
    };

    const boardcode = new Boardcode({
      code_idx: req.body.code_idx,
      name: req.body.name,
      code: req.body.code
    });

    // 데이터베이스에 저장
    Boardcode.create(boardcode, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating the Code."
            });
        } else{
          res.send('<script type="text/javascript"> alert("코드가 등록되었습니다"); window.location="/boardcode"; </script>');
        };
    })
};

// 전체 조회 
exports.findAll = (req,res)=>{
  Boardcode.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving codes."
          });
        else res.send(data);
      });
};

// code_idx로 조회
exports.findOne = (req,res)=>{
  Boardcode.findById(req.params.code_idx, (err, data) => {
        if (err) {
          if (err.kind === "찾을 수 없습니다") {
            res.status(404).send({
              message: `해당 ${req.params.code_idx} 번호를 찾을 수 없습니다.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving code " + req.params.code_idx
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
      message: "Code can not be empty!"
    });
  }

  Boardcode.updateById(
    req.params.code_idx,
    new Boardcode(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "찾을 수 없습니다.") {
          res.status(404).send({
            message: `Not found code ${req.params.code_idx}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating code " + req.params.code_idx
          });
        }
      } else {
          res.send('<script type="text/javascript"> alert("코드가 수정되었습니다"); window.location="/boardcode"; </script>');
      }
    }
  );
};

// code_idx로 삭제
exports.delete = (req,res)=>{
  Boardcode.remove(req.params.code_idx, (err, data) => {
        if (err) {
          if (err.kind === "찾을 수 없습니다") {
            res.status(404).send({
              message: `Not found code ${req.params.code_idx}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete code " + req.params.code_idx
            });
          }
        } else {
          res.send('<script type="text/javascript"> alert("코드가 삭제되었습니다"); window.location="/boardcode"; </script>');
        }
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  Boardcode.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "삭제 오류 메시지"
          });
        else res.send({ message: `모든 코드가 삭제되었습니다.` });
      });
};