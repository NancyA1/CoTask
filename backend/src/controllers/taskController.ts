import { Request, Response } from "express";
import prisma from "../config/prisma";

const createTask = async (req:Request,res:Response)=>{
    try{  
    const {title,description,status,priority,projectId,dueDate}=req.body;

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
      projectId,
      dueDate: dueDate ? new Date(dueDate) : null
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

const getTasks = async (req: Request, res: Response) => {
    try{
 const tasks = await prisma.task.findMany();
 res.json({
    tasks
 })}

 catch(error){
    res.status(500).json({
            message: "Something went wrong"
        });
 }
}



export{createTask,getTasks};