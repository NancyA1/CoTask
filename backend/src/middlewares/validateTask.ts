import { Request, Response, NextFunction } from "express";
const validateTask = (req: Request, res: Response, next: NextFunction) => {
const {title}=req.body;
if(!title){
     return res.status(400).json({
        message:"Title is required"
     });
}
next();

};
export { validateTask };