import { Router } from "express";
import type { Request, Response } from "express";
import { userModel } from "../models/models.ts";

const userRouter = Router();

userRouter.post("/newUser", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (name.length <= 1)
        return res.status(411).send("name has to have more than 1 character");
    if (!email.includes("@"))
        return res.status(411).send("email must contain `@`");
    if (name || email || password)
        return res
            .status(409)
            .send("user with name, email or password already exists");

    try {
        const newUser = await userModel.create({ name, email, password });
        const { password: _, ...user } = newUser.toObject();
        return res.status(200).json(user);
    } catch (error) {
        console.error("error", error);
        return res.status(500).send("Internal server error");
    }
});

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const getUsers = await userModel.find();
        if (!getUsers.length)
            return res.status(204).send("No users were found");
        return res.status(200).json(getUsers);
    } catch (error) {
        console.log(error);
    }
});

userRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    if (updates.name.length <= 1)
        return res.status(411).send("name has to have more than 1 character");
    if (!updates.email.includes("@"))
        return res.status(411).send("email must contain `@`");
    if (updates.name || updates.email || updates.password)
        return res
            .status(409)
            .send("user with name, email or password already exists");

    try {
        const updateUser = await userModel.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updateUser)
            return res
                .status(404)
                .send(`No user with id: ${updateUser} is found.`);
        res.status(200).json(updateUser);
    } catch (error) {
        console.error("error", error);
        return res.status(500).send("Internal server error");
    }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(404).send("user not found");
        await userModel.findByIdAndDelete(id);
        return res.status(200).send("User removed succesfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});

export default userRouter;
