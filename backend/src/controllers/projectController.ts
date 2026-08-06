import { Request, Response } from "express";
import prisma from "../config/prisma";

const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany();

        res.json({
            message: "all projects",
            projects
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};
const createProject= async ( req:Request,res:Response)=>{
    try{
    const {name,description}=req.body;
    const project= await prisma.project.create({
        data:{   
        name,
        description 
     }
        
    });
    res.json({
     project
    })
    }
    catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Internal Server Error"
    });
}


}

const getProjectById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const project = await prisma.project.findUnique({
            where: {
                id
            }
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json({
            project
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
const updateProjectById= async (req:Request,res:Response)=>{
    try{
    const id = Number(req.params.id);
    const {name,description}= req.body;
    const project= await prisma.project.findUnique({
        where:{
        id:id
        }
    });
    if(!project){
         return res.status(404).json({
                message: "Project not found"
            });
    }
    const updatedProject= await prisma.project.update({
        where:{
            id:id
        },
        data:{
         name,description
        }
    });
    res.json({
        project: updatedProject
    })
}
    catch(error){
        res.status(404).json({
            message:"couldnt update the project"
        })
    }
}
const deleteProjectById = async (req:Request, res:Response)=>{
 try{
    const id= Number(req.params.id);
  const project= await prisma.project.delete({
    where:{
        id:id
    }
  })
  res.json({
    "message": "Project deleted successfully"
  })
 }

 catch(error){
    res.status(404).json({
            message:"Couldn't delete project"
        })
 }
}


export { getProjects,createProject,getProjectById,updateProjectById,deleteProjectById};