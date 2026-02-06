import { findOrdersService, getOrderByIdService, updateOrderStatusService } from "./order.service";
import { Request, Response } from "express";
export const getOrderDetailsHandler = async (
  req: Request,
  res: Response
) => {
    const orderId = Number(req.params.id);

    const order = await getOrderByIdService(orderId);
    res.json({order});

};
export const getOrdersHandler = async (req: Request, res: Response) => {
  const result = await findOrdersService(req.query);
  res.json(result);
    
};

export const updateOrderStatusHandler = async (req: Request, res: Response) => {
  const order = await updateOrderStatusService(
    Number(req.params.id),
    req.body.status
  );

  res.json(order);
};
