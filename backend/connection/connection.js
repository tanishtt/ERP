const mysql=require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tanish99@#@#",
    database:'doorly',
    

});
//console.log(connection);

module.exports=connection;







