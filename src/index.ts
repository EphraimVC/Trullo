import express from "express";
import type { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World" });
});
app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`);
});
