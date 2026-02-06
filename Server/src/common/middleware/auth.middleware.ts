import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
 import { verifyAccessToken } from "../../auth/utils/jwt";
import logger from "../logger/logger";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
     
     return next(new AppError("Unauthorized", 401));
  }

  const token = header.split(" ")[1];

  if (!token) {
     return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = payload;
    next();
  } catch (err) {
  return next(new AppError("Invalid token", 401));
}
};
