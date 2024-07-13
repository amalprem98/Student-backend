const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');

const app=express();
const port=8081;

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"EngG$&007",
    database:"crud"
})
db.connect(function(err){
    if(err){
        console.error('Database connection failed:', err.stack);
    }
    else{
        console.log("db connected");
    }
});

app.get("/",(req,res)=>{
    const sql="SELECT * FROM Student";
    db.query(sql,(err,data)=>{
        if(err){
            return res.json("error");
        }
        return res.json(data)
    });
});//Math.floor(Math.random() * (max - min + 1)) + min
app.post('/create',(req,res)=>{
    const sql="INSERT INTO Student (ID,NAME,EMAIL) VALUES(?)";
    const values=[
        req.body.id,
        req.body.name,
        req.body.email
    ];
    db.query(sql,[values],(err,data)=>{
        console.log(err)
        if(err) return res.json("Error");
        return res.json(data);
    });
});
app.put('/update/:id',(req,res)=>{
    const sql="UPDATE STUDENT SET NAME =? EMAIL=? WHERE ID=?";
    const values=[
        req.body.id,
        req.body.name,
        req.body.email
    ];
    db.query(sql,[values],(err,data)=>{
        console.log(err)
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.listen(port,()=>{
    console.log(`server listening:${port}`);
})