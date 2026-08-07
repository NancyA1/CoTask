import { Request, Response, NextFunction } from "express";
const validateTask = (req: Request, res: Response, next: NextFunction) => {
const {title, status, priority}=req.body;
const validStatuses = ["todo", "in_progress", "done"];
const validPriorities=["low","medium","high"];
if(!title){
     return res.status(400).json({
        message:"Title is required"
     });
}
if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
        message: "Status must be todo, in_progress, or done"
    });
}
if(priority && !validPriorities.includes(priority)){
    return res.status(400).json({
        message:"priority must be low,medium, or high"
    });
}
next();

};
export { validateTask };