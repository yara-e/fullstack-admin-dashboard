"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./analytics.controller"));
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const role_middleware_1 = require("../common/middleware/role.middleware");
const analyticsRouter = (0, express_1.Router)();
const route = [auth_middleware_1.authenticate, (0, role_middleware_1.allowRoles)("ADMIN", "MANAGER")];
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
exports.default = analyticsRouter;
