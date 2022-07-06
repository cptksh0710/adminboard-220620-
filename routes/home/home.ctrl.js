"use strict";

const db = require('../../app/models/db.js');

//각각 /views/home 디렉토리 내의 ejs파일들을 렌더링
function start (request,response){
    response.render("home/index");
};

function register (request,response){
    response.render("home/register");
};

function dashboard (request,response){
    response.render("home/dashboard");
};

function profile (request,response){
    response.render("home/profile");
};

// 사용자 정보 DB에서 가져오는 함수
function userlist (request,response,next){
    var sql = "SELECT no, name, id, password, permission, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date, "+
            " date_format(mod_date,'%Y-%m-%d %H:%i:%s') mod_date from user;";
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        response.render('home/userlist', { title: 'User List', userData: data});
    });
};

function userreg (request,response){
    response.render("home/user_reg");
};

function dataimport (request,response){
    response.render("home/import");
};

function code (request,response){
    response.render("home/code");
};

function codereg (request,response){
    response.render("home/code_reg");
};

function dataexport (request,response){
    response.render("home/export");
};

function datalist (request,response){
    var sql = "SELECT boardno, title, content, writer, date_format(timestr,'%Y-%m-%d %H:%i:%s') timestr "+
    "from board;";
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        response.render('home/datalist', { title: 'Data List', dataList: data});
    });
};

module.exports = {
    start,
    register,
    profile,
    dashboard,
    userlist,
    userreg,
    dataimport,
    code,
    codereg,
    dataexport,
    datalist
};