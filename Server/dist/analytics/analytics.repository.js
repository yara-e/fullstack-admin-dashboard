"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderCompletionRateRaw = exports.getLowStockProductsRaw = exports.getOrdersPerHourRaw = exports.getRevenueByPaymentMethodRaw = exports.getProductsByIds = exports.getBestSellersRaw = exports.getUsersByRoleRaw = exports.getOrdersByStatusRaw = exports.getOrdersTrendsRaw = exports.getOverView = void 0;
const client_1 = require("../common/db/client");
const client_2 = require("@prisma/client");
// ---------- Overview ----------
const getOverView = async () => {
    const [users, products, orders] = await Promise.all([
        client_1.prisma.user.count({ where: { isDeleted: false } }),
        client_1.prisma.product.count({ where: { isDeleted: false } }),
        client_1.prisma.order.aggregate({
            _count: true,
            _sum: { amount: true },
        }),
    ]);
    return { users, products, orders };
};
exports.getOverView = getOverView;
// ---------- Orders Trend ----------
const getOrdersTrendsRaw = async (days, groupBy) => {
    const allowed = ["day", "week", "month"];
    if (!allowed.includes(groupBy))
        throw new Error("Invalid groupBy value");
    const query = client_2.Prisma.sql `
    SELECT
      DATE_TRUNC(${client_2.Prisma.raw(`'${groupBy}'`)}, "createdAt") as date,
      COUNT(*)::int as orders,
      COALESCE(SUM(amount),0)::float as revenue
    FROM "Order"
    WHERE "createdAt" >= NOW() - INTERVAL ${client_2.Prisma.raw(`'${days} days'`)}
    GROUP BY 1
    ORDER BY 1 ASC
  `;
    return client_1.prisma.$queryRaw(query);
};
exports.getOrdersTrendsRaw = getOrdersTrendsRaw;
// ---------- Orders by Status ----------
const getOrdersByStatusRaw = async () => client_1.prisma.order.groupBy({
    by: ["status"],
    _count: true,
});
exports.getOrdersByStatusRaw = getOrdersByStatusRaw;
// ---------- Users by Role ----------
const getUsersByRoleRaw = async () => client_1.prisma.user.groupBy({
    by: ["role"],
    _count: true,
});
exports.getUsersByRoleRaw = getUsersByRoleRaw;
// ---------- Best Sellers ----------
const getBestSellersRaw = async () => client_1.prisma.orderProduct.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
});
exports.getBestSellersRaw = getBestSellersRaw;
const getProductsByIds = async (ids) => client_1.prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true },
});
exports.getProductsByIds = getProductsByIds;
// ---------- Revenue by Payment Method ----------
const getRevenueByPaymentMethodRaw = async () => {
    return client_1.prisma.order.findMany({
        where: {
            Payment: {
                isNot: null, // only orders that have a payment
            },
        },
        select: {
            Payment: {
                select: {
                    method: true,
                },
            },
            amount: true,
        },
    });
};
exports.getRevenueByPaymentMethodRaw = getRevenueByPaymentMethodRaw;
// ---------- Orders per Hour ----------
const getOrdersPerHourRaw = async (days) => {
    return client_1.prisma.$queryRaw `
    SELECT EXTRACT(HOUR FROM "createdAt") AS hour,
           COUNT(*)::int as orders
    FROM "Order"
    WHERE "createdAt" >= NOW() - INTERVAL ${client_2.Prisma.raw(`'${days} days'`)}
    GROUP BY hour
    ORDER BY hour
  `;
};
exports.getOrdersPerHourRaw = getOrdersPerHourRaw;
// ---------- Top Customers ----------
// export const getTopCustomersRaw = async (limit: number = 5) =>
//   prisma.order.groupBy({
//     by: ["userId"],
//     _sum: { amount: true },
//     orderBy: { _sum: { amount: "desc" } },
//     take: limit,
//   });
// ---------- Low Stock Products ----------
const getLowStockProductsRaw = async (threshold = 5) => client_1.prisma.product.findMany({
    where: { stock: { lte: threshold }, isDeleted: false },
    select: { id: true, name: true, stock: true },
});
exports.getLowStockProductsRaw = getLowStockProductsRaw;
// ---------- Order Completion Rate ----------
const getOrderCompletionRateRaw = async () => client_1.prisma.order.groupBy({
    by: ["status"],
    _count: true,
});
exports.getOrderCompletionRateRaw = getOrderCompletionRateRaw;
