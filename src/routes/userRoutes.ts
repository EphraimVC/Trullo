import { Router } from "express";
import type { Request, Response } from "express";
import { userModel } from "../models/models.ts";
import { checkExistingUser } from "./userhelpers.ts";

const userRouter = Router();

userRouter.post("/newUser", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (name.length <= 1)
        return res.status(411).send("name has to have more than 1 character");
    if (!email.includes("@"))
        return res.status(411).send("email must contain `@`");

    try {
        checkExistingUser(req, res, name, email, password);
        const newUser = await userModel.create({ name, email, password });
        const { password: _, ...user } = newUser.toObject();
        return res.status(200).json(user);
    } catch (error) {
        console.error("error", error);
        return res.status(500).send("Internal server error");
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const getUserById = await userModel.findById(req.params.id);
        if (!getUserById) return res.status(204).send("No user were found");
        return res.status(200).json(getUserById);
    } catch (error) {
        console.log(error);
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
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).send("user not found");
        return res.status(200).send("User removed succesfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});

export default userRouter;
