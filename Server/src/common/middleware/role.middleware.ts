import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";
import AppError from "../error/appError";
 

export const allowRoles = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};
