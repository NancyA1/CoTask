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
 const tasks = await prisma.task.findMany({
    include:{project:true}
 });
 res.json({
    tasks
 })}

 catch(error){
    res.status(500).json({
            message: "Something went wrong"
        });
 }
}
const getTaskById = async (req: Request, res: Response) => {
    try{
const id = Number(req.params.id);
const task= await prisma.task.findUnique({
    where:{
        id:id
    }

});
if(!task){
 return  res.status(404).json({
    message:"task not found"
  });
}
res.status(200).json({
    task
})
    }
    catch (error) {
    return res.status(500).json({
        message: "Something went wrong"
    });
}
};

const updateTaskById = async (req: Request, res: Response) => {
    try{
const id = Number(req.params.id);
const {title,description,status,priority,dueDate}=req.body;
const task = await prisma.task.findUnique({
    where:{
        id:id
    }
});
if(!task){
   return res.status(404).json({
        message:"task not found"
    })
}
const updatedTask  = await prisma.task.update({
  where:{
    id:id
  },
  data:{
    title,
    description,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate) : null

  }
});

res.status(200).json({
    updatedTask 
})
    }
    catch(error){
        return res.status(500).json({
        message: "Something went wrong"
    });
    }
};
const deleteTaskById = async (req:Request,res:Response) =>{
    try{

const id = Number(req.params.id);
const task = await prisma.task.findUnique({
   where:{
    id:id
   }
});
if(!task){
    return res.status(404).json({
        message:"task not found"
    })
}
const deletedTask= await prisma.task.delete({
    where:{
        id:id
    }
});
res.status(200).json({
    deletedTask
})
    }
    catch(error){
        res.status(500).json({
            message:"somthing went wrong"
        });
    }
}
export{createTask,getTasks,getTaskById,updateTaskById,deleteTaskById};