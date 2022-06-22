const maria = require("mysql");
const dbConfig = require("../config/db.config.js");

// 데이터베이스 connection 객체 생성
const connection = maria.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.database,
    port: dbConfig.port
});

// MySQL connection 실행
connection.connect(error=>{
    if(error) throw error;
    console.log("Successfully connected to the database. ");
})

module.exports = connection;