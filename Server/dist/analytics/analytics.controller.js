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
exports.orderCompletionRateHandler = exports.lowStockProductsHandler = exports.ordersPerHourHandler = exports.revenueByPaymentMethodHandler = exports.bestSellersHandler = exports.userRolesHandler = exports.ordersStatusHandler = exports.ordersTrendHandler = exports.overviewHandler = void 0;
const service = __importStar(require("./analytics.service"));
// ---------- Overview ----------
const overviewHandler = async (_req, res) => {
    res.json(await service.getOverviewService());
};
exports.overviewHandler = overviewHandler;
// ---------- Orders Trend ----------
const ordersTrendHandler = async (req, res) => {
    const days = Number(req.query.days || 30);
    const groupBy = req.query.groupBy || "day";
    res.json(await service.getOrdersTrendService(days, groupBy));
};
exports.ordersTrendHandler = ordersTrendHandler;
// ---------- Orders Status ----------
const ordersStatusHandler = async (_req, res) => {
    res.json(await service.getOrdersStatusService());
};
exports.ordersStatusHandler = ordersStatusHandler;
// ---------- Users by Role ----------
const userRolesHandler = async (_req, res) => {
    res.json(await service.getUserRolesService());
};
exports.userRolesHandler = userRolesHandler;
// ---------- Best Sellers ----------
const bestSellersHandler = async (_req, res) => {
    res.json(await service.getBestSellersService());
};
exports.bestSellersHandler = bestSellersHandler;
// ---------- Revenue by Payment Method ----------
const revenueByPaymentMethodHandler = async (_req, res) => {
    res.json(await service.getRevenueByPaymentMethodService());
};
exports.revenueByPaymentMethodHandler = revenueByPaymentMethodHandler;
// ---------- Orders per Hour ----------
const ordersPerHourHandler = async (req, res) => {
    const days = Number(req.query.days || 30);
    res.json(await service.getOrdersPerHourService(days));
};
exports.ordersPerHourHandler = ordersPerHourHandler;
// ---------- Top Customers ----------
// export const topCustomersHandler = async (req: Request, res: Response) => {
//   const limit = Number(req.query.limit || 5);
//   res.json(await service.getTopCustomersService(limit));
// };
// ---------- Low Stock Products ----------
const lowStockProductsHandler = async (req, res) => {
    const threshold = Number(req.query.threshold || 5);
    res.json(await service.getLowStockProductsService(threshold));
};
exports.lowStockProductsHandler = lowStockProductsHandler;
// ---------- Order Completion Rate ----------
const orderCompletionRateHandler = async (_req, res) => {
    res.json(await service.getOrderCompletionRateService());
};
exports.orderCompletionRateHandler = orderCompletionRateHandler;
