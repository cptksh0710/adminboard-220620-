const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.json({message: "Database 서버에 연결되었습니다!"});
});

require("./app/routes/admin.routes.js")(app);
require("./app/routes/board.routes.js")(app);

// 포트넘버 설정
app.listen(3005, ()=>{
    console.log("Server is running on port 3005.");
})