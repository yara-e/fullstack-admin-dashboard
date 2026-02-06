import {prisma} from "../common/db/client";
import { ChartDataSet } from './analytics.types';

export const getOverView = async () => {
    const [users,products,orders] = await Promise.all([
        prisma.user.count({where:{isDeleted:false}}),
        prisma.product.count({where:{isDeleted:false}}),
        prisma.order.aggregate({
_count:true,
            _sum:{ amount: true }
        })

    ])
    return {
         users , products,orders
    }
}
export const getOrdersTrendsRaw = async(days:number)=>{
    return prisma.$queryRaw<{data:string , orders:number , revenu:number}[]>`
    SELECT
      DATE("createdAt") as date,
      COUNT(*) as orders,
      COALESCE(SUM(amount),0) as revenue
    FROM "Order"
    WHERE "createdAt" >= NOW() - INTERVAL '${days} days'
    GROUP BY DATE("createdAt")
    ORDER BY date ASC
    `
}

export const getOrdersByStatusRaw = async()=>{
    return prisma.order.groupBy({
        by:["status"],
        _count:true
    })
}

export const getUsersByRoleRaw = async()=>{
    return prisma.user.groupBy({
        by:["role"],
        _count:true
    })
}

export const getBestSellersRaw=async()=>{
    return prisma.orderProduct.groupBy({
        by:["productId"],
        _sum:{quantity:true},
        orderBy:{
_sum:{quantity:"desc"}
        },
        take:5
    })
}

