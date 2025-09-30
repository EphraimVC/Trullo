import { Router } from "express";
import type { Request, Response } from "express";
import { taskModel } from "../models/models.ts";

const taskRouter = Router();

taskRouter.post("/newTask", async (req: Request, res: Response) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status)
        return res
            .status(409)
            .send("title, description and status are required");

    try {
        const existingTask = await taskModel.findOne({
            $or: [{ title }],
        });
        if (existingTask) return res.status(409).send("Task already exists");
        const newTask = await taskModel.create(req.body);
        return res.status(200).json(newTask);
    } catch (error) {
        console.error("error:", error);
        res.status(500).send("Internal server error");
    }
});

taskRouter.get("/", async (req: Request, res: Response) => {
    try {
        const allTasks = await taskModel.find();
        if (allTasks.length === 0)
            return res.status(411).send("There are no tasks saved");
        return res.status(200).json(allTasks);
    } catch (error) {
        console.error("error:", error);
        res.status(500).send("Internal server error");
    }
});

taskRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const getTaskById = await taskModel.findById(req.params.id);
        if (!getTaskById) return res.status(204).send("No task were found");
        return res.status(200).json(getTaskById);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});

taskRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updateTask = await taskModel.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updateTask)
            return res
                .status(404)
                .send(`No user with id: ${updateTask} is found.`);
        res.status(200).json(updateTask);
    } catch (error) {
        console.error("error", error);
        return res.status(500).send("Internal server error");
    }
});

taskRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).send("task not found");
        return res.status(200).send("Task removed succesfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});

export default taskRouter;
