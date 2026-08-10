import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
type JwtPayload = {
    userId: number;
    username: string;
};

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
const authHeader = req.headers.authorization;
if(!authHeader){
     return res.status(401).json({
        message:"access denied"
    });
}
const token = authHeader.split(" ")[1];
const secret = process.env.JWT_SECRET;
if(!secret){
     return res.status(500).json({
        message: "JWT secret is not configured"
    });
}

const decoded=jwt.verify(token,secret) as JwtPayload;
req.user = decoded;
next();
    }
    catch(error){
        res.status(401).json({
            message:"Unauthorized"
        })
    }
};
export { authMiddleware };