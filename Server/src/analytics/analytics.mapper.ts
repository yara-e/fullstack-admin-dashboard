import { chartResponse } from "./analytics.types";

// ---------- Orders Trend ----------
export const mapOrdersTrendChart = (
  rows: any[],
  days: number,
  groupBy: "day" | "week" | "month"
): chartResponse => ({
  labels: rows.map(r => {
    const d = new Date(r.date);
    switch (groupBy) {
      case "day":
        return d.toLocaleDateString();
      case "week":
        const week = Math.ceil(
          (d.getDate() - d.getDay() + 1) / 7
        );
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

// ---------- Orders Status ----------
export const mapStatusChart = (rows: any[]): chartResponse => ({
  labels: rows.map(r => r.status),
  datasets: [{ label: "Orders", data: rows.map(r => r._count) }],
});

// ---------- Users by Role ----------
export const mapUserRolesChart = (rows: any[]): chartResponse => ({
  labels: rows.map(r => r.role),
  datasets: [{ label: "Users", data: rows.map(r => r._count) }],
});

// ---------- Best Sellers ----------
export const mapBestSellersChart = (
  rows: any[],
  products: Map<number, string>
): chartResponse => ({
  labels: rows.map(r => products.get(r.productId) || "Unknown"),
  datasets: [{ label: "Sold Quantity", data: rows.map(r => r._sum.quantity ?? 0) }],
});

// ---------- Revenue by Payment Method ----------
export const mapRevenueByPaymentMethod = (rows: any[]): chartResponse => {
  const totals: Record<string, number> = {};
  rows.forEach(r => {
    const method = r.Payment.method;
    totals[method] = (totals[method] || 0) + Number(r.amount);
  });
  return {
    labels: Object.keys(totals),
    datasets: [{ label: "Revenue", data: Object.values(totals) }],
  };
};

// ---------- Orders per Hour ----------
export const mapOrdersPerHour = (rows: any[]): chartResponse => ({
  labels: rows.map(r => `${r.hour}:00`),
  datasets: [{ label: "Orders", data: rows.map(r => r.orders) }],
});

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
export const mapLowStockProducts = (rows: any[]): chartResponse => ({
  labels: rows.map(r => r.name),
  datasets: [{ label: "Stock Left", data: rows.map(r => r.stock) }],
});

// ---------- Order Completion Rate ----------
export const mapOrderCompletionRate = (rows: any[]): chartResponse => ({
  labels: rows.map(r => r.status),
  datasets: [{ label: "Orders", data: rows.map(r => r._count) }],
});