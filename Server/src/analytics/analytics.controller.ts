import { Request, Response } from "express";
import * as service from "./analytics.service";

// ---------- Overview ----------
export const overviewHandler = async (_req: Request, res: Response) => {
  res.json(await service.getOverviewService());
};

// ---------- Orders Trend ----------
export const ordersTrendHandler = async (req: Request, res: Response) => {
  const days = Number(req.query.days || 30);
  const groupBy = (req.query.groupBy as any) || "day";
  res.json(await service.getOrdersTrendService(days, groupBy));
};

// ---------- Orders Status ----------
export const ordersStatusHandler = async (_req: Request, res: Response) => {
  res.json(await service.getOrdersStatusService());
};

// ---------- Users by Role ----------
export const userRolesHandler = async (_req: Request, res: Response) => {
  res.json(await service.getUserRolesService());
};

// ---------- Best Sellers ----------
export const bestSellersHandler = async (_req: Request, res: Response) => {
  res.json(await service.getBestSellersService());
};

// ---------- Revenue by Payment Method ----------
export const revenueByPaymentMethodHandler = async (_req: Request, res: Response) => {
  res.json(await service.getRevenueByPaymentMethodService());
};

// ---------- Orders per Hour ----------
export const ordersPerHourHandler = async (req: Request, res: Response) => {
  const days = Number(req.query.days || 30);
  res.json(await service.getOrdersPerHourService(days));
};

// ---------- Top Customers ----------
// export const topCustomersHandler = async (req: Request, res: Response) => {
//   const limit = Number(req.query.limit || 5);
//   res.json(await service.getTopCustomersService(limit));
// };

// ---------- Low Stock Products ----------
export const lowStockProductsHandler = async (req: Request, res: Response) => {
  const threshold = Number(req.query.threshold || 5);
  res.json(await service.getLowStockProductsService(threshold));
};

// ---------- Order Completion Rate ----------
export const orderCompletionRateHandler = async (_req: Request, res: Response) => {
  res.json(await service.getOrderCompletionRateService());
};