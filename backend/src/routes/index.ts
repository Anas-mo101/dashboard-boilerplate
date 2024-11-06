import express, { Router } from "express";

import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const routes = Router();

routes.use("/api", userRoutes);
routes.use("/api/auth", authRoutes);


export default routes;
