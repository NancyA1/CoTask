import { Request, Response } from "express";
import prisma from "../config/prisma";
const addMember = async (req: Request, res: Response) => {
    try {
        const projectId = Number(req.params.id);
        const userId = Number(req.body.userId);

        const currentUserId = req.user!.userId;

        const membership = await prisma.projectMember.findUnique({
    where: {
        userId_projectId: {
            userId: currentUserId,
            projectId
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
        message: "Only project admins can add members"
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
const member = await prisma.projectMember.create({
    data: {
        userId,
        projectId,
        role: "member"
    }
});

res.status(201).json({
    message: "Member added successfully",
    member
});
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};
export { addMember };