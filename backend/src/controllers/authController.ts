import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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


const login = async (req: Request, res: Response) => {
    try{
const {email,password}= req.body;
const user = await prisma.user.findUnique({
    where:{email}
})
  if(!user){
    return res.status(401).json({
        message:"Invalid email or password"
    });
  }
const isPasswordValid = await bcrypt.compare(password, user.password);
if(!isPasswordValid){
 return res.status(401).json({
    message:"Invalid email or password"
 })
}
const secret = process.env.JWT_SECRET;
if (!secret) {
    return res.status(500).json({
        message: "JWT secret is not configured"
    });
}
const payload = {userId:user.id,username:user.name};
const token = jwt.sign(payload,secret);
res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax"
});
res.status(200).json({
    message: "Login successful",

})
    }
    catch(error){
         res.status(500).json({
            message: "Something went wrong"
        });
    }
};



export{register,login}