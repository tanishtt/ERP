const mysql=require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tanish99@#@#",
    database:'erp',
    

});
//console.log(con);

module.exports=connection;







