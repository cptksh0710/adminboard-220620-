"use strict";

const db = require('../../models/db.js');

//각각 /views/home 디렉토리 내의 ejs파일들을 렌더링
function start (request,response){
    response.render("home/index");
};

function dashboard (request,response){
    response.render("home/dashboard");
};

function profile (request,response){
    response.render("home/profile");
};

// 사용자 정보, DB의 user 테이블에서 데이터를 가져오는 함수
function userlist (request,response){
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
    var sql1 = "SELECT name, code from boardcode;";
    var sql2 = "SELECT name, code from countrycode;";
    var sql3 = "SELECT name, code from langcode; ";

    db.query(sql1, (err, data1, fields) => {
        if (err) throw err;

        db.query(sql2, (err, data2, fields) => {
            if (err) throw err;

            db.query(sql3, (err, data3, fields) => {
                if (err) throw err;
            
                response.render('home/import', {boardCode:data1, countryCode:data2, langCode:data3});
            });
        });
    });
};

/*
function dataimport (request,response){
    response.render('home/import');
};*/

//코드, DB의 boardcode, countrycode, langcode 3개의 테이블에서 데이터를 가져오는 함수
function boardcode (request,response){
    var sql = "SELECT code_idx, name, code,  date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date from boardcode;";
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        response.render('home/boardcode', { title: 'Board Code', boardCode: data});
    });
};

function countrycode (request,response){
    var sql = "SELECT code_idx, name, code, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date from countrycode;";
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        response.render('home/countrycode', { title: 'Country Code', countryCode: data});
    });
};

function langcode (request,response){
    var sql = "SELECT code_idx, name, code, date_format(reg_date,'%Y-%m-%d %H:%i:%s') reg_date from langcode;";
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        response.render('home/langcode', { title: 'Language Code', langCode: data});
    });
};

function boardcodereg (request,response){
    response.render("home/boardcode_reg");
};

function boardcodeedit (request,response){
    response.render("home/boardcode_edit");
};

function countrycodereg (request,response){
    response.render("home/countrycode_reg");
};

function countrycodeedit (request,response){
    response.render("home/countrycode_edit");
};

function langcodereg (request,response){
    response.render("home/langcode_reg");
};

function langcodeedit (request,response){
    response.render("home/langcode_edit");
};

module.exports = {
    start,
    profile,
    dashboard,
    userlist,
    userreg,
    dataimport,
    boardcode,
    countrycode,
    langcode,
    boardcodereg,
    boardcodeedit,
    countrycodereg,
    countrycodeedit,
    langcodereg,
    langcodeedit
};