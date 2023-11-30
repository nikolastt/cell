import { Router } from "express";
import { createUserHandle } from "./controller";

const userRoutes = Router();

userRoutes.post("/", createUserHandle);

export { userRoutes };
