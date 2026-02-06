import { Router } from "express";
import * as controller from "./analytics.controller";
 import { authenticate }  from "../common/middleware/auth.middleware";
import { allowRoles } from "../common/middleware/role.middleware";

const analyticsRouter = Router();

analyticsRouter.get("/overview",authenticate,allowRoles("ADMIN", "MANAGER"), controller.overviewHandler);
analyticsRouter.get("/charts/orders-trend",authenticate,allowRoles("ADMIN", "MANAGER"), controller.ordersTrendHandler);
analyticsRouter.get("/charts/orders-status",authenticate,allowRoles("ADMIN", "MANAGER"), controller.ordersStatusHandler);
analyticsRouter.get("/charts/user-roles", authenticate,allowRoles("ADMIN", "MANAGER"),controller.userRolesHandler);
analyticsRouter.get("/charts/best-sellers", authenticate,allowRoles("ADMIN", "MANAGER"),controller.bestSellersHandler);

export default analyticsRouter;
