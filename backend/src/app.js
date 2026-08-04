const express = require("express"); //import express

const app = express(); // creating a express application

app.get("/api/healthy",(req,res)=>{
   res.json({
    message:"CoTask API is running"
   })
});



module.exports=app;