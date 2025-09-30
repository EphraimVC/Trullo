import { userModel } from "../models/models.ts";
import type { Response, Request } from "express";

export const checkExistingUser = async (
    req: Request,
    res: Response,
    name?: string,
    email?: string,
    password?: string
) => {
    const existingUser = await userModel.findOne({
        $or: [{ name: name }, { email: email }, { password: password }],
    });
    if (existingUser)
        return res
            .status(409)
            .send("user with name, email or password already exists");
};
