mysql=require("mysql");
var db=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"project"
});
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected");
});
module.exports=db;