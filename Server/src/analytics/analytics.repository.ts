import { prisma } from "../common/db/client";
import { Prisma } from "@prisma/client";

// ---------- Overview ----------
export const getOverView = async () => {
  const [users, products, orders] = await Promise.all([
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.product.count({ where: { isDeleted: false } }),
    prisma.order.aggregate({
      _count: true,
      _sum: { amount: true },
    }),
  ]);
  return { users, products, orders };
};

// ---------- Orders Trend ----------
export const getOrdersTrendsRaw = async (
  days: number,
  groupBy: "day" | "week" | "month"
) => {
  const allowed = ["day", "week", "month"] as const;
  if (!allowed.includes(groupBy)) throw new Error("Invalid groupBy value");

  const query = Prisma.sql`
    SELECT
      DATE_TRUNC(${Prisma.raw(`'${groupBy}'`)}, "createdAt") as date,
      COUNT(*)::int as orders,
      COALESCE(SUM(amount),0)::float as revenue
    FROM "Order"
    WHERE "createdAt" >= NOW() - INTERVAL ${Prisma.raw(`'${days} days'`)}
    GROUP BY 1
    ORDER BY 1 ASC
  `;
  return prisma.$queryRaw<{ date: Date; orders: number; revenue: number }[]>(query);
};

// ---------- Orders by Status ----------
export const getOrdersByStatusRaw = async () =>
  prisma.order.groupBy({
    by: ["status"],
    _count: true,
  });

// ---------- Users by Role ----------
export const getUsersByRoleRaw = async () =>
  prisma.user.groupBy({
    by: ["role"],
    _count: true,
  });

// ---------- Best Sellers ----------
export const getBestSellersRaw = async () =>
  prisma.orderProduct.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
  });

export const getProductsByIds = async (ids: number[]) =>
  prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true },
  });

// ---------- Revenue by Payment Method ----------
export const getRevenueByPaymentMethodRaw = async () => {
  return prisma.order.findMany({
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

// ---------- Orders per Hour ----------
export const getOrdersPerHourRaw = async (days: number) => {
  return prisma.$queryRaw<{ hour: number; orders: number }[]>`
    SELECT EXTRACT(HOUR FROM "createdAt") AS hour,
           COUNT(*)::int as orders
    FROM "Order"
    WHERE "createdAt" >= NOW() - INTERVAL ${Prisma.raw(`'${days} days'`)}
    GROUP BY hour
    ORDER BY hour
  `;
};

// ---------- Top Customers ----------
// export const getTopCustomersRaw = async (limit: number = 5) =>
//   prisma.order.groupBy({
//     by: ["userId"],
//     _sum: { amount: true },
//     orderBy: { _sum: { amount: "desc" } },
//     take: limit,
//   });

// ---------- Low Stock Products ----------
export const getLowStockProductsRaw = async (threshold: number = 5) =>
  prisma.product.findMany({
    where: { stock: { lte: threshold }, isDeleted: false },
    select: { id: true, name: true, stock: true },
  });

// ---------- Order Completion Rate ----------
export const getOrderCompletionRateRaw = async () =>
  prisma.order.groupBy({
    by: ["status"],
    _count: true,
  });