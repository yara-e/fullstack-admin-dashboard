// src/user/user.routes.ts
import { Router } from "express";
import {
  getUsersHandler,
  updateUserHandler,
  deleteUserHandler,
} from "./user.controller";
 import { authenticate as authMiddleware}  from "../common/middleware/auth.middleware";
import { allowRoles as requireRole } from "../common/middleware/role.middleware";
const userRouter = Router();

userRouter.get(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  getUsersHandler
);

userRouter.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  updateUserHandler
);

userRouter.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteUserHandler
);

export default userRouter;
