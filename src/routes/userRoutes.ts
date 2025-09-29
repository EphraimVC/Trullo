import { Router } from "express";
import type { Request, Response } from "express";
import { userModel } from "../models/models.ts";

const userRouter = Router();

userRouter.post("/newUser", async (req: Request, res: Response) => {
    const validEndings = [".com", ".se", ".net"];
    try {
        const newUser = await userModel.create(req.body);
        if (newUser.name.length <= 1) {
            res.status(411).send("name has to have more than 1 character");
        }
        if (
            newUser.email.includes("@") &&
            validEndings.some((suffix) => newUser.email.endsWith(suffix))
        ) {
            res.status(411).send("email must contain `@` and end with `.*`");
        }
    } catch (error) {
        console.error("error", error);
    }
});

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const getUsers = await userModel.find();
        res.status(200).json(getUsers);
    } catch (error) {
        console.log(error);
    }
});

export default userRouter;
