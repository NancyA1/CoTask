const express = require("express"); //import express

const app = express(); // creating a express application

app.use(express.json());
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects",projectRoutes);

app.get("/api/healthy",(req,res)=>{
   res.json({
    message:"CoTask API is running"
   })
});


module.exports=app;