 import {prisma} from "../common/db/client"
 import { FindOrderQuery } from "./order.types";


 interface FindOrdersParams{
    limit:number;
    after?:{createdAt:string;id:number} | null;
    before?:{createdAt:string;id:number} | null;
    status?:string;
    userId?:number;
}
 

export const findOrders= async (query: FindOrdersParams) => {
const limit = Math.min(Number(query.limit) || 10, 100);

    if (query.after && query.before) {
        throw new Error("Cannot use both 'after' and 'before'");
      }
    const isBackward = Boolean(query.before);
    const cursor = query.after ?? query.before;  // asign var to first value that is not null or undefined.
   const where: any = {};
    if (query.status) {     
        where.status = query.status;
    }
    if (query.userId) {     
        where.userId = query.userId;
    }
   if (cursor) {
    where.OR = [
      {
        createdAt: isBackward
          ? { gt: cursor.createdAt }
          : { lt: cursor.createdAt },
      },
      {
        createdAt: cursor.createdAt,
        id: isBackward
          ? { gt: cursor.id }
          : { lt: cursor.id },
      },
    ];
  }
const orders = await prisma.order.findMany({
    where,
    take: limit,
    orderBy: [  
        { createdAt: isBackward ? "asc" : "desc" },
        { id: isBackward ? "asc" : "desc" },
        ],
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,

      User: {
        select: {
          id: true,
          name: true,
        },
      },

      Payment: {
        select: {
          status: true,
          method: true,
        },
      },
    }
    })
     return isBackward ? orders.reverse() : orders;
    }

    export const updateOrderStatus = async (
  orderId: number,
  status: "COMPLETED" | "CANCELLED"
) => {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      Payment: status === "COMPLETED"
        ? {
            update: {
              status: "PAID",
              paidAt: new Date(),
            },
          }
        : undefined,
    },
  });
};

export const findOrderById = async (
  orderId: number,
  
) => {
  const where: any = { id: orderId };

  

  const order = await prisma.order.findFirst({
    where,
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      OrderProduct: {
        include: {
          Product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      Payment: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};


