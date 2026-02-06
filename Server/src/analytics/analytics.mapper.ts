import { chartResponse } from "./analytics.types";

export const mapOrdersTrendChart = (rows: any[], days: number): chartResponse => {
  return {
    labels: rows.map(r => r.date),
    datasets: [
      {
        label: "Orders",
        data: rows.map(r => Number(r.orders)),
      },
      {
        label: "Revenue",
        data: rows.map(r => Number(r.revenue)),
      },
    ],
    meta: {
      range: `${days}d`,
    },
  };
};

export const mapStatusChart = (rows: any[]): chartResponse => ({
  labels: rows.map(r => r.status),
  datasets: [
    {
      label: "Orders",
      data: rows.map(r => r._count),
    },
  ],
});

export const mapUserRolesChart = (rows: any[]): chartResponse => ({
  labels: rows.map(r => r.role),
  datasets: [
    {
      label: "Users",
      data: rows.map(r => r._count),
    },
  ],
});

export const mapBestSellersChart = (
  rows: any[],
  products: Map<number, string>
): chartResponse => ({
  labels: rows.map(r => products.get(r.productId) || "Unknown"),
  datasets: [
    {
      label: "Sold Quantity",
      data: rows.map(r => r._sum.quantity ?? 0),
    },
  ],
});
