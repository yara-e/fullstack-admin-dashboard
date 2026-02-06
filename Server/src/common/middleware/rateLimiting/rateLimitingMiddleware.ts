import { Request, Response, NextFunction } from "express";
import ratelimit from "./rateLimiting";
 

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const identifier =  req.ip ?? "anonymous";
if(identifier){
    
}
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return res.status(429).json({
      message: "Too many requests",
    });
  }

  next();
};

