import { Request, Response } from "express";
import * as service from "./analytics.service";

export const overviewHandler = async (_req: Request, res: Response) => {
  res.json(await service.getOverviewService());
};

export const ordersTrendHandler = async (req: Request, res: Response) => {
  const days = Number(req.query.days || 30);
  res.json(await service.getOrdersTrendService(days));
};

export const ordersStatusHandler = async (_req: Request, res: Response) => {
  res.json(await service.getOrdersStatusService());
};

export const userRolesHandler = async (_req: Request, res: Response) => {
  res.json(await service.getUserRolesService());
};

export const bestSellersHandler = async (_req: Request, res: Response) => {
  res.json(await service.getBestSellersService());
};
