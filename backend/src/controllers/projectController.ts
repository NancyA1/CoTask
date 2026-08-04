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

export { getProjects };