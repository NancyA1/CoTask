import { Request, Response } from "express";
import prisma from "../config/prisma";

const createTask = async (req:Request,res:Response)=>{
    try{  
    const {title,description,status,priority,projectId}=req.body;

    const project = await prisma.project.findUnique({
        where:{
            id:projectId
        }
    })
    if (!project) {
    return res.status(404).json({
        message: "Project not found"
    });
}
    const task = await prisma.task.create({
        data:{
        title,
       description, 
      status,      
      priority,    
      projectId
        }
    })
    res.status(201).json({
      task
})
}
catch(error){
     res.status(500).json({
            message: "Something went wrong"
        });
}
}
export{createTask};