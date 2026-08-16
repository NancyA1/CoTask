import { Request, Response } from "express";
import prisma from "../config/prisma";

const getProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
       const projects = await prisma.project.findMany({
    where: {
        members: {
            some: {
                userId: userId
            }
        }
    },
    include: {
        members: true,
        tasks: true
    }
});
const projectsWithProgress = projects.map((project) => {
    const totalTasks = project.tasks.length;

    const completedTasks = project.tasks.filter(
        (task) => task.status === "done"
    ).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    return {
        ...project,
        progress,
    };
});
        res.json({
            message: "all projects",
            projects: projectsWithProgress
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
    const userId = req.user!.userId;
    const project= await prisma.project.create({
        data:{   
        name,
        description 
     }
        
    });

    await prisma.projectMember.create({
    data: {
        userId,
        projectId: project.id,
        role: "admin"
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
        const userId = req.user!.userId;

        const project = await prisma.project.findUnique({
    where: {
        id
    },
    include: {
        members: {
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        },
        tasks: true
    }
});

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        const membership = await prisma.projectMember.findUnique({
    where: {
        userId_projectId: {
            userId,
            projectId: id
        }
    }
});

if (!membership) {
    return res.status(403).json({
        message: "You are not a member of this project"
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
    const userId = req.user!.userId;
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
    const membership = await prisma.projectMember.findUnique({
    where: {
        userId_projectId: {
            userId,
            projectId: id
        }
    }
});

if (!membership) {
    return res.status(403).json({
        message: "You are not a member of this project"
    });
}
if (membership.role !== "admin") {
    return res.status(403).json({
        message: "Only project admins can update the project"
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
    console.error(error);

    res.status(500).json({
        message: "Something went wrong"
    });
}
}
const deleteProjectById = async (req:Request, res:Response)=>{
 try{
    const id= Number(req.params.id);
    const userId = req.user!.userId;
    const membership = await prisma.projectMember.findUnique({
    where: {
        userId_projectId: {
            userId,
            projectId: id
        }
    }
});
if (!membership) {
    return res.status(403).json({
        message: "You are not a member of this project"
    });
}
if (membership.role !== "admin") {
    return res.status(403).json({
        message: "Only project admins can delete the project"
    });
}
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
    console.error(error);

    res.status(500).json({
        message: "Something went wrong"
    });
}
}


export { getProjects,createProject,getProjectById,updateProjectById,deleteProjectById};