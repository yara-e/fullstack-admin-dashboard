// src/user/user.controller.ts
import {
  getUsersService,
  updateUserService,
  softDeleteUserService
} from "./user.service";
import { Request , Response } from "express";
export const getUsersHandler = async (req: Request , res: Response) => {
  const result = await getUsersService(req.query);
  res.json(result);
};

export const updateUserHandler = async (req: Request , res: Response) => {
  const id = Number(req.params.id);
  const user = await updateUserService(id, req.body);
  res.json(user);
};

export const deleteUserHandler = async (req: Request , res: Response) => {
  const id = Number(req.params.id);
  await softDeleteUserService(id);
  res.json("User deleted");
};
