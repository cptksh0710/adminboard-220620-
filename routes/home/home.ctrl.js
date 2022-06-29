"use strict";

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

function userlist (request,response){
    response.render("home/userlist");
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
    response.render("home/datalist");
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