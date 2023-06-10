const express=require("express");
const db=require("./config");
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");
const port=5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port,()=>{
    console.log("listening on port");
})
app.get("/show",(req,res)=>{
    db.query("select * from  employees",function(err,result){
        if (err){
            throw err;
        }
        else{
            res.json(result);
        }
        
        
    })
})
app.delete("/remove:id",(req,res)=>{
    var id=req.params.id;
    db.query("delete from employees where id=?",id,function(err,result){
    if(err) throw err;
    res.sendStatus(200);
    });
        
})
app.post("/add",(req,res)=>{
    const insertQuery="INSERT INTO employees set ?";
    db.query(insertQuery,req.body,function(err,result){
        if (err){
            console.log(err);
        }
    })
})
app.get("/find:first_name",(req,res)=>{
    input="%"+req.params.first_name+"%";
    query="select id,first_name,last_name,salary from employees where first_name like ?";
    db.query(query,input,function(err,result){
        if(err) throw err;
        res.json(result);
    })
    
    
})