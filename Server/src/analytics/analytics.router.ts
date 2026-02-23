import { Router } from "express";
import * as controller from "./analytics.controller";
import { authenticate } from "../common/middleware/auth.middleware";
import { allowRoles } from "../common/middleware/role.middleware";

const analyticsRouter = Router();

const route = [authenticate, allowRoles("ADMIN", "MANAGER")];

// Overview
analyticsRouter.get("/overview", ...route, controller.overviewHandler);

// Charts
analyticsRouter.get("/charts/orders-trend", ...route, controller.ordersTrendHandler);
analyticsRouter.get("/charts/orders-status", ...route, controller.ordersStatusHandler);
analyticsRouter.get("/charts/user-roles", ...route, controller.userRolesHandler);
analyticsRouter.get("/charts/best-sellers", ...route, controller.bestSellersHandler);

// New Advanced Analytics
analyticsRouter.get("/charts/revenue-by-payment", ...route, controller.revenueByPaymentMethodHandler);
analyticsRouter.get("/charts/orders-per-hour", ...route, controller.ordersPerHourHandler);
//analyticsRouter.get("/charts/top-customers", ...route, controller.topCustomersHandler);
analyticsRouter.get("/charts/low-stock-products", ...route, controller.lowStockProductsHandler);
analyticsRouter.get("/charts/order-completion-rate", ...route, controller.orderCompletionRateHandler);

export default analyticsRouter; 