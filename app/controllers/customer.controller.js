const Board = require("../models/customer.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const board = new Board({
        no: req.body.boardno,
        title: req.body.title,
        content: req.body.content,
        writer: req.body.writer
    });

    // 데이터베이스에 저장
    Board.create(board, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Customer."
            });
        };
    })
};

// 전체 조회 
exports.findAll = (req,res)=>{
  Board.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// title로 조회
exports.findOne = (req,res)=>{
  Board.findById(req.params.Title, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found title ${req.params.Title}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving title " + req.params.Title
            });
          }
        } else res.send(data);
      });
};

// title로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Board.updateById(
    req.params.Title,
    new Board(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found title ${req.params.Title}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating title " + req.params.Title
          });
        }
      } else res.send(data);
    }
  );
};

// title로 삭제
exports.delete = (req,res)=>{
  Board.remove(req.params.Title, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found title ${req.params.Title}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete title " + req.params.Title
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  Board.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "삭제 오류 메시지"
          });
        else res.send({ message: `All Titles were deleted successfully!` });
      });
};