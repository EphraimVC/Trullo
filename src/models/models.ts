import mongoose from "mongoose";
import { hashPassword } from "../middleware/bcryptPassword.ts";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre("save", hashPassword);

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["to-do", "in progress", "blocked", "done"],
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    createdAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: null },
});

const userModel = mongoose.model("User", userSchema);
const taskModel = mongoose.model("Task", taskSchema);

export { userModel, taskModel };
