// src/product/product.controller.ts
import {
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "./product.service";
import { Request , Response } from "express";
export const getProductsHandler = async (req : Request, res: Response) => {
  const result = await getProductService(req.query);
  res.json(result);
};

export const createProductHandler = async (req:Request, res:Response) => {
  const product = await createProductService(req.body);
  res.status(201).json(product);
};

export const updateProductHandler = async (req:Request, res:Response) => {
  const id = Number(req.params.id);
  const product = await updateProductService(id, req.body);
  res.json(product);
};

export const deleteProductHandler = async (req:Request, res:Response) => {
  const id = Number(req.params.id);
  await deleteProductService(id);
  res.status(204).send();
};
