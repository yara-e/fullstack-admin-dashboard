import { findProducts, updateProduct, softDeleteProduct, createProduct } from "./product.repository";
import { FindProductQuery } from "./product.types";
import { decodeCursor, encodeCursor } from "../common/utils/cursor";
import { invalidateAnalyticsCache } from "../analytics/cacheInvalidations";
import AppError from "../common/error/appError";

export const getProductService = async (query: FindProductQuery) => {
  const limit = Math.min(Number(query.limit) || 10, 100);

  // Decode cursors EARLY (service responsibility)
  const after = query.after ? decodeCursor(query.after) : undefined;
  const before = query.before ? decodeCursor(query.before) : undefined;

  if (after && before) {
    throw new AppError("Cannot use both 'after' and 'before'");
  }
  const minPrice =
    query.minPrice !== undefined
      ? Number(query.minPrice)
      : undefined;

  const maxPrice =
    query.maxPrice !== undefined
      ? Number(query.maxPrice)
      : undefined;
  const products = await findProducts({
    limit: limit + 1,
    after,
    before,
    search: query.search,
    minPrice,
    maxPrice,
    isActive:
      query.isActive !== undefined
        ? query.isActive === "true"
        : undefined,
  })

  const hasMore = products.length > limit;

  if (hasMore) {
    if (before) {
      // backward pagination → remove first item
      products.shift();
    } else {
      // forward pagination → remove last item
      products.pop();
    }
  }
  // cursors
  let nextCursor: string | null = null;
  let prevCursor: string | null = null;

  if (after) {
    nextCursor = hasMore ? encodeCursor(products[products.length - 1]) : null;
    prevCursor = products.length ? encodeCursor(products[0]) : null;
  } else if (before) {
    nextCursor = products.length ? encodeCursor(products[products.length - 1]) : null;
    prevCursor = hasMore ? encodeCursor(products[0]) : null;
  } else {
    // first page
    nextCursor = hasMore ? encodeCursor(products[products.length - 1]) : null;
    prevCursor = null;
  }

  return {
    data: products,
    meta: {
      limit,
      nextCursor,
      prevCursor,
      hasMore,
    },
  };

}

export const createProductService = async (data: any) => {

  const product = await createProduct(data);
  await invalidateAnalyticsCache()
  return product
};

export const updateProductService = async (id: number, data: any) => {
  const updateproduct = await updateProduct(id, data);
  await invalidateAnalyticsCache()
  return updateproduct;
};

export const deleteProductService = async (id: number) => {

  const deleteproduct = await softDeleteProduct(id);
  await invalidateAnalyticsCache()
  return deleteproduct;
};
