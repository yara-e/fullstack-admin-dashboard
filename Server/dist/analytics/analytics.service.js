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
exports.getOrderCompletionRateService = exports.getLowStockProductsService = exports.getOrdersPerHourService = exports.getRevenueByPaymentMethodService = exports.getBestSellersService = exports.getUserRolesService = exports.getOrdersStatusService = exports.getOrdersTrendService = exports.getOverviewService = void 0;
const repo = __importStar(require("./analytics.repository"));
const mapper = __importStar(require("./analytics.mapper"));
const cachedService_1 = require("../common/cache/cachedService");
const cacheKeys_1 = require("../common/cache/cacheKeys");
// ---------- Overview ----------
const getOverviewService = async () => {
    return (0, cachedService_1.cachedService)({
        key: cacheKeys_1.cacheKeys.dashboardSummary(),
        fetcher: async () => {
            const data = await repo.getOverView();
            return {
                totalUsers: data.users,
                totalProducts: data.products,
                totalOrders: data.orders._count,
                totalRevenue: data.orders._sum.amount || 0,
            };
        },
    });
};
exports.getOverviewService = getOverviewService;
// ---------- Orders Trend ----------
const getOrdersTrendService = async (days, groupBy) => {
    return (0, cachedService_1.cachedService)({
        key: cacheKeys_1.cacheKeys.ordersTrend(days, groupBy),
        fetcher: async () => {
            const rows = await repo.getOrdersTrendsRaw(days, groupBy);
            return mapper.mapOrdersTrendChart(rows, days, groupBy);
        },
    });
};
exports.getOrdersTrendService = getOrdersTrendService;
// ---------- Orders Status ----------
const getOrdersStatusService = async () => {
    const rows = await repo.getOrdersByStatusRaw();
    return mapper.mapStatusChart(rows);
};
exports.getOrdersStatusService = getOrdersStatusService;
// ---------- Users by Role ----------
const getUserRolesService = async () => {
    const rows = await repo.getUsersByRoleRaw();
    return mapper.mapUserRolesChart(rows);
};
exports.getUserRolesService = getUserRolesService;
// ---------- Best Sellers ----------
const getBestSellersService = async () => {
    return (0, cachedService_1.cachedService)({
        key: cacheKeys_1.cacheKeys.bestSellers(),
        fetcher: async () => {
            const rows = await repo.getBestSellersRaw();
            const products = await repo.getProductsByIds(rows.map(r => r.productId));
            const productMap = new Map(products.map(p => [p.id, p.name]));
            return mapper.mapBestSellersChart(rows, productMap);
        },
    });
};
exports.getBestSellersService = getBestSellersService;
// ---------- Revenue by Payment Method ----------
const getRevenueByPaymentMethodService = async () => {
    return (0, cachedService_1.cachedService)({
        key: cacheKeys_1.cacheKeys.revenueByPaymentMethod(),
        fetcher: async () => {
            const rows = await repo.getRevenueByPaymentMethodRaw();
            return mapper.mapRevenueByPaymentMethod(rows);
        },
    });
};
exports.getRevenueByPaymentMethodService = getRevenueByPaymentMethodService;
// ---------- Orders per Hour ----------
const getOrdersPerHourService = async (days) => {
    return (0, cachedService_1.cachedService)({
        key: cacheKeys_1.cacheKeys.ordersPerHour(days),
        fetcher: async () => {
            const rows = await repo.getOrdersPerHourRaw(days);
            return mapper.mapOrdersPerHour(rows);
        },
    });
};
exports.getOrdersPerHourService = getOrdersPerHourService;
// ---------- Top Customers ----------
// export const getTopCustomersService = async (limit = 5) => {
//   return cachedService({
//     key: cacheKeys.topCustomers(limit),
//     fetcher: async () => {
//       const rows = await repo.getTopCustomersRaw(limit);
//       return mapper.mapTopCustomersChart(rows);
//     },
//   });
// };
// ---------- Low Stock Products ----------
const getLowStockProductsService = async (threshold = 5) => {
    return (0, cachedService_1.cachedService)({
        key: cacheKeys_1.cacheKeys.lowStockProducts(threshold),
        fetcher: async () => {
            const rows = await repo.getLowStockProductsRaw(threshold);
            return mapper.mapLowStockProducts(rows);
        },
    });
};
exports.getLowStockProductsService = getLowStockProductsService;
// ---------- Order Completion / Cancellation Rate ----------
const getOrderCompletionRateService = async () => {
    const rows = await repo.getOrderCompletionRateRaw();
    return mapper.mapOrderCompletionRate(rows);
};
exports.getOrderCompletionRateService = getOrderCompletionRateService;
