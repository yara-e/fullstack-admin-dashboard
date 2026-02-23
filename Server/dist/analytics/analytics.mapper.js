"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOrderCompletionRate = exports.mapLowStockProducts = exports.mapOrdersPerHour = exports.mapRevenueByPaymentMethod = exports.mapBestSellersChart = exports.mapUserRolesChart = exports.mapStatusChart = exports.mapOrdersTrendChart = void 0;
// ---------- Orders Trend ----------
const mapOrdersTrendChart = (rows, days, groupBy) => ({
    labels: rows.map(r => {
        const d = new Date(r.date);
        switch (groupBy) {
            case "day":
                return d.toLocaleDateString();
            case "week":
                const week = Math.ceil((d.getDate() - d.getDay() + 1) / 7);
                return `Week ${week}`;
            case "month":
                return d.toLocaleString("default", { month: "short" });
        }
    }),
    datasets: [
        { label: "Orders", data: rows.map(r => Number(r.orders)) },
        { label: "Revenue", data: rows.map(r => Number(r.revenue)) },
    ],
    meta: { range: `${days}d`, groupBy },
});
exports.mapOrdersTrendChart = mapOrdersTrendChart;
// ---------- Orders Status ----------
const mapStatusChart = (rows) => ({
    labels: rows.map(r => r.status),
    datasets: [{ label: "Orders", data: rows.map(r => r._count) }],
});
exports.mapStatusChart = mapStatusChart;
// ---------- Users by Role ----------
const mapUserRolesChart = (rows) => ({
    labels: rows.map(r => r.role),
    datasets: [{ label: "Users", data: rows.map(r => r._count) }],
});
exports.mapUserRolesChart = mapUserRolesChart;
// ---------- Best Sellers ----------
const mapBestSellersChart = (rows, products) => ({
    labels: rows.map(r => products.get(r.productId) || "Unknown"),
    datasets: [{ label: "Sold Quantity", data: rows.map(r => r._sum.quantity ?? 0) }],
});
exports.mapBestSellersChart = mapBestSellersChart;
// ---------- Revenue by Payment Method ----------
const mapRevenueByPaymentMethod = (rows) => {
    const totals = {};
    rows.forEach(r => {
        const method = r.Payment.method;
        totals[method] = (totals[method] || 0) + Number(r.amount);
    });
    return {
        labels: Object.keys(totals),
        datasets: [{ label: "Revenue", data: Object.values(totals) }],
    };
};
exports.mapRevenueByPaymentMethod = mapRevenueByPaymentMethod;
// ---------- Orders per Hour ----------
const mapOrdersPerHour = (rows) => ({
    labels: rows.map(r => `${r.hour}:00`),
    datasets: [{ label: "Orders", data: rows.map(r => r.orders) }],
});
exports.mapOrdersPerHour = mapOrdersPerHour;
// ---------- Top Customers ----------
// export const mapTopCustomersChart = async (rows: any[]): Promise<chartResponse> => {
//   // rows contain { userId, _sum: { amount } }
//   const { prisma } = require("../common/db/client");
//   const users = await prisma.user.findMany({
//     where: { id: { in: rows.map(r => r.userId) } },
//     select: { id: true, name: true },
//   });
//   const userMap = new Map(users.map(u => [u.id, u.name]));
//   return {
//     labels: rows.map(r => userMap.get(r.userId) || "Unknown"),
//     datasets: [{ label: "Spent Amount", data: rows.map(r => r._sum.amount ?? 0) }],
//   };
// };
// ---------- Low Stock Products ----------
const mapLowStockProducts = (rows) => ({
    labels: rows.map(r => r.name),
    datasets: [{ label: "Stock Left", data: rows.map(r => r.stock) }],
});
exports.mapLowStockProducts = mapLowStockProducts;
// ---------- Order Completion Rate ----------
const mapOrderCompletionRate = (rows) => ({
    labels: rows.map(r => r.status),
    datasets: [{ label: "Orders", data: rows.map(r => r._count) }],
});
exports.mapOrderCompletionRate = mapOrderCompletionRate;
