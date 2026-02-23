import * as repo from "./analytics.repository";
import * as mapper from "./analytics.mapper";
import { cachedService } from "../common/cache/cachedService";
import { cacheKeys } from "../common/cache/cacheKeys";

// ---------- Overview ----------
export const getOverviewService = async () => {
  return cachedService({
    key: cacheKeys.dashboardSummary(),
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

// ---------- Orders Trend ----------
export const getOrdersTrendService = async (
  days: number,
  groupBy: "day" | "week" | "month"
) => {
  return cachedService({
    key: cacheKeys.ordersTrend(days, groupBy),
    fetcher: async () => {
      const rows = await repo.getOrdersTrendsRaw(days, groupBy);
      return mapper.mapOrdersTrendChart(rows, days, groupBy);
    },
  });
};

// ---------- Orders Status ----------
export const getOrdersStatusService = async () => {
  const rows = await repo.getOrdersByStatusRaw();
  return mapper.mapStatusChart(rows);
};

// ---------- Users by Role ----------
export const getUserRolesService = async () => {
  const rows = await repo.getUsersByRoleRaw();
  return mapper.mapUserRolesChart(rows);
};

// ---------- Best Sellers ----------
export const getBestSellersService = async () => {
  return cachedService({
    key: cacheKeys.bestSellers(),
    fetcher: async () => {
      const rows = await repo.getBestSellersRaw();
      const products = await repo.getProductsByIds(
        rows.map(r => r.productId)
      );
      const productMap = new Map(products.map(p => [p.id, p.name]));
      return mapper.mapBestSellersChart(rows, productMap);
    },
  });
};

// ---------- Revenue by Payment Method ----------
export const getRevenueByPaymentMethodService = async () => {
  return cachedService({
    key: cacheKeys.revenueByPaymentMethod(),
    fetcher: async () => {
      const rows = await repo.getRevenueByPaymentMethodRaw();
      return mapper.mapRevenueByPaymentMethod(rows);
    },
  });
};

// ---------- Orders per Hour ----------
export const getOrdersPerHourService = async (days: number) => {
  return cachedService({
    key: cacheKeys.ordersPerHour(days),
    fetcher: async () => {
      const rows = await repo.getOrdersPerHourRaw(days);
      return mapper.mapOrdersPerHour(rows);
    },
  });
};

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
export const getLowStockProductsService = async (threshold = 5) => {
  return cachedService({
    key: cacheKeys.lowStockProducts(threshold),
    fetcher: async () => {
      const rows = await repo.getLowStockProductsRaw(threshold);
      return mapper.mapLowStockProducts(rows);
    },
  });
};

// ---------- Order Completion / Cancellation Rate ----------
export const getOrderCompletionRateService = async () => {
  const rows = await repo.getOrderCompletionRateRaw();
  return mapper.mapOrderCompletionRate(rows);
};