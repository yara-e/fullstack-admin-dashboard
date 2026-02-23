import { prisma } from "../common/db/client"
import { FindOrderQuery } from "./order.types";


interface FindOrdersParams {
  limit: number;
  after?: { createdAt: Date; id: number } | null;
  before?: { createdAt: Date; id: number } | null;
  status?: string;
  userId?: number;
}


export const findOrders = async (params: FindOrdersParams) => {
  const { limit, after, before, status, userId } = params;

  if (after && before) {
    throw new Error("Cannot use both 'after' and 'before'");
  }

  const isBackward = Boolean(before);
  const cursor = after ?? before;

  const where: any = {};

  if (status) where.status = status;
  if (userId) where.userId = userId;

  if (cursor) {
    const cursorFilter = isBackward
      ? {
          OR: [
            { createdAt: { gt: cursor.createdAt } },
            { createdAt: cursor.createdAt, id: { gt: cursor.id } },
          ],
        }
      : {
          OR: [
            { createdAt: { lt: cursor.createdAt } },
            { createdAt: cursor.createdAt, id: { lt: cursor.id } },
          ],
        };

    where.AND = [...(where.AND ?? []), cursorFilter];
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
      User: { select: { id: true, name: true } },
      Payment: { select: { status: true, method: true } },
    },
  });

  return isBackward ? orders.reverse() : orders;
};

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

export const findUsersOrder = async (userId: number) => {
  const orders = await prisma.order.findMany({
    where: { userId: userId },
    include: {

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
      Payment: true
    }
  })
  return orders;
}

