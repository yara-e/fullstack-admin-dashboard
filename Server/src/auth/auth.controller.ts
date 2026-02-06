import { Request , Response } from "express";
import {login} from "./auth.service";

export const loginHandler = async (req: Request , res: Response) => {
    const {email , password} = req.body;
    const result = await login (email , password);
    res.json(result)
}