import express from "express";
import projectRoutes from "./routes/projectRoutes";

const app = express();

app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/api/healthy", (req, res) => {
    res.json({
        message: "CoTask API is running"
    });
});

export default app;