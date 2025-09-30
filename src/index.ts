import express from "express";
import type { Application } from "express";
import { ConnectDB } from "./config/database.ts";
import userRoutes from "./routes/userRoutes.ts";
import taskRoutes from "./routes/taskRoutes.ts";

const app: Application = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

ConnectDB()
    .then(() => {
        app.listen(PORT, (): void => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });
