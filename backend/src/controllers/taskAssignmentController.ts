import { Request, Response } from "express";
import prisma from "../config/prisma";

const assignUserToTask = async (req: Request, res: Response) => {
    try {
        const taskId = Number(req.params.id);
        const userId = Number(req.body.userId);

        const currentUserId = req.user!.userId;
        const task = await prisma.task.findUnique({
    where: {
        id: taskId
    }
});
if (!task) {
    return res.status(404).json({
        message: "Task not found"
    });
}
const membership = await prisma.projectMember.findUnique({
    where: {
        userId_projectId: {
            userId: currentUserId,
            projectId: task.projectId
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
        message: "Only project admins can assign users to tasks"
    });
}
const user = await prisma.user.findUnique({
    where: {
        id: userId
    }
});
if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
const assignedUserMembership = await prisma.projectMember.findUnique({
    where: {
        userId_projectId: {
            userId,
            projectId: task.projectId
        }
    }
});
if (!assignedUserMembership) {
    return res.status(403).json({
        message: "User is not a member of this project"
    });
}
const existingAssignment = await prisma.taskAssignment.findUnique({
    where: {
        userId_taskId: {
            userId,
            taskId
        }
    }
});
if (existingAssignment) {
    return res.status(409).json({
        message: "User is already assigned to this task"
    });
}
   const assignment = await prisma.taskAssignment.create({
    data: {
        userId,
        taskId
    }
});
res.status(201).json({
    message: "User assigned to task successfully",
    assignment
});


}
    catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};
export{assignUserToTask}