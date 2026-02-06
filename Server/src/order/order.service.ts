
import { invalidateAnalyticsCache } from '../analytics/cacheInvalidations';
import AppError from '../common/error/appError';
import { encodeCursor, decodeCursor } from '../common/utils/cursor';
import { findOrderById, findOrders, updateOrderStatus } from './order.repository';
import { FindOrderQuery } from './order.types';

export const findOrdersService = async (query: FindOrderQuery) => {

    const limit = Math.min(Number(query.limit) || 10, 100);
     const after = query.after ? decodeCursor(query.after) : undefined;
      const before = query.before ? decodeCursor(query.before) : undefined;
    
      if (after && before) {
        throw new AppError("Cannot use both 'after' and 'before'");
      }
     
      const orders =await findOrders({
        limit : limit+1,
        after,
        before,
        status:query.status,
        userId:query.userId,
      })
    
       const hasMore = orders.length > limit;
    
      if (hasMore) {
        orders.pop(); // remove extra item
      }
      const nextCursor =
        hasMore && orders.length
          ? encodeCursor(orders[orders.length - 1])
          : null;
    
      const prevCursor =
        (after || before) && orders.length
          ? encodeCursor(orders[0])
          : null;
    
      return {
        data: orders,
        meta: {
          limit,
          nextCursor,
          prevCursor,
          hasMore,
        },
      };
}

 
export const updateOrderStatusService = async(
  orderId: number,
  status: "COMPLETED" | "CANCELLED"
) => {
  const update= await updateOrderStatus(orderId, status);
  await invalidateAnalyticsCache();
  return  update
};

export const getOrderByIdService = (
  orderId: number, 
) => {
   
    return findOrderById(orderId);
  
 
 
};