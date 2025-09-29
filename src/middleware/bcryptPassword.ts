import type { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from "bcrypt";

export async function hashPassword(
    this: any,
    next: CallbackWithoutResultAndOptionalError
) {
    if (!this.isModified("password")) return next();

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error as Error);
    }
}

// export const hashingPassoword = async (password: string): Promise<string> => {
//     const saltRounds = 10;
//     return await bcrypt.hash(password, saltRounds);
// };
