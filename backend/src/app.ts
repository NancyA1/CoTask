import express from "express";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import projectMemberRoutes from "./routes/projectMemberRoutes";
const app = express();

app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/api/healthy", (req, res) => {
    res.json({
        message: "CoTask API is running"
    });
});
app.use("/api/tasks", taskRoutes);

app.use("/api/auth",authRoutes);
app.use("/api/projects", projectMemberRoutes);
export default app;