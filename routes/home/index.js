"use strict"; // 엄격 모드 / 디버깅이 쉬워지고 발생 가능한 에러들을 예방한다.

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// 페이지 라우팅 설정
router.get("/", ctrl.start);
router.get("/register", ctrl.register);
router.get("/dashboard", ctrl.dashboard);
router.get("/profile", ctrl.profile);
router.get("/userlist", ctrl.userlist);
router.get("/import", ctrl.dataimport);
router.get("/code", ctrl.code);
router.get("/code_reg", ctrl.codereg);
router.get("/export", ctrl.dataexport);
router.get("/datalist", ctrl.datalist);

module.exports = router;