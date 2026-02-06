import * as repo from "./analytics.repository";
import * as mapper from "./analytics.mapper";
import { prisma } from "../common/db/client";
import { cachedService } from "../common/cache/cachedService";
import { cacheKeys } from "../common/cache/cacheKeys";

export const getOverviewService = async () => {

  return cachedService({
    key:cacheKeys.dashboardSummary(),
    fetcher:async()=>{
       const data = await repo.getOverView();

  return {
    totalUsers: data.users,
    totalProducts: data.products,
    totalOrders: data.orders._count,
    totalRevenue: data.orders._sum.amount || 0,
  };
    }
  })
 
};

export const getOrdersTrendService = async (days: number) => {


  return cachedService({
    key:cacheKeys.ordersTrend(days),
    fetcher:async ()=>{
const rows = await repo.getOrdersTrendsRaw(days);
  return mapper.mapOrdersTrendChart(rows, days);
    }
  })

};

export const getOrdersStatusService = async () => {
  const rows = await repo.getOrdersByStatusRaw();
  return mapper.mapStatusChart(rows);
};

export const getUserRolesService = async () => {
  const rows = await repo.getUsersByRoleRaw();
  return mapper.mapUserRolesChart(rows);
};

export const getBestSellersService = async () => {


  return cachedService({
    key:cacheKeys.bestSellers(),
    fetcher:async()=>{
 const rows = await repo.getBestSellersRaw();

  const products = await prisma.product.findMany({
    where: {
      id: { in: rows.map(r => r.productId) },
    },
    select: { id: true, name: true },
  });

  const productMap = new Map(products.map(p => [p.id, p.name]));

  return mapper.mapBestSellersChart(rows, productMap);
    }
  })
 
};
