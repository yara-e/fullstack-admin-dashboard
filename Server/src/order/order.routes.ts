import { Router } from "express";
import {
getOrderDetailsHandler,
  getOrdersHandler,
  updateOrderStatusHandler,
} from "./order.controller";
import { authenticate }  from "../common/middleware/auth.middleware";
import { allowRoles  } from "../common/middleware/role.middleware";

const orderRouter = Router();

 
orderRouter.get("/", authenticate, getOrdersHandler);
orderRouter.patch("/:id",authenticate,allowRoles("ADMIN", "MANAGER"),updateOrderStatusHandler);
orderRouter.get("/:id", authenticate, getOrderDetailsHandler);

export default orderRouter;


 
