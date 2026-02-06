export interface ChartDataSet{
    label: string;
    data: number[];
}
export interface chartResponse{
    labels: string[];
    datasets: ChartDataSet[];
    meta?:Record<string, any>;
}

export interface OverviewResponse{
    totalUsers: number;
    totalOrders: number;
    totalRevenu: number;
    totalProducts: number;
}