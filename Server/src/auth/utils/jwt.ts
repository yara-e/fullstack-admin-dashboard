import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;

if (!ACCESS_TOKEN_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

interface JwtPayload {
  id: number;
   role: string;
}

export const createAccessToken = (user: JwtPayload) => {
  return jwt.sign(
    {
      id: user.id,
       
      role: user.role,
    },
    ACCESS_TOKEN_SECRET  ,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET  ) as {
        userId: number;
        role: string;
    }
}
  