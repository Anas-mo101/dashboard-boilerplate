import { Router } from "express";

import isAuth from "../middleware/isAuth";
import * as UserController from "../controllers/UserController";

const userRoutes = Router();

userRoutes.get("/admin", isAuth, UserController.index);

userRoutes.post("/admin", isAuth, UserController.store);

userRoutes.put("/admin/:id", isAuth, UserController.update);

userRoutes.get("/admin/:id", isAuth, UserController.show);

userRoutes.delete("/admin/:id", isAuth, UserController.remove);

export default userRoutes;
