export const cacheKeys = {
  ordersTrend: (days: number) =>
    `analytics:orders-trend:${days}`,

  dashboardSummary: () =>
    `analytics:dashboard-summary`,
  bestSellers:()=>
    `analytics:best-sellers`,
};
