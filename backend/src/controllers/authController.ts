import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
    try{
const {email,name,password}=req.body;
const existingUser  = await prisma.user.findUnique({
    where:{email}
});
if(existingUser){
    return res.status(400).json({
        message:"Email already registered"
    });
}
const hashedPassword = await bcrypt.hash(password,10); 
const newUser = await prisma.user.create({
    data:{
        name,
        password:hashedPassword,
        email
    }
});
res.status(201).json({
    id:newUser.id,
    email:newUser.email,
    name:newUser.name
});
    }
    catch(error){
        res.status(500).json({
            message:"somthing went wrong"
        })
    }
};
export{register}