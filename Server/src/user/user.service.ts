import  {findUsers , updateUser , softDeleteUser } from "./user.repository";
import { FindUsersQuery } from "./user.types";
 import { decodeCursor, encodeCursor } from "../common/utils/cursor"
import { invalidateAnalyticsCache } from "../analytics/cacheInvalidations";
import AppError from "../common/error/appError";

export const getUsersService = async (query: FindUsersQuery) => {
  const limit = Math.min(Number(query.limit) || 10, 100);

  // Decode cursors EARLY (service responsibility)
  const after = query.after ? decodeCursor(query.after) : undefined;
  const before = query.before ? decodeCursor(query.before) : undefined;

  if (after && before) {
    throw new AppError("Cannot use both 'after' and 'before'");
  }

  // Fetch one extra record to detect next/prev page
  const users = await findUsers({
    limit: limit + 1,
    after,
    before,
    search: query.search,
    role: query.role,
  });

  const hasMore = users.length > limit;

  if (hasMore) {
    users.pop(); // remove extra item
  }

  //  Encode cursors LATE (service responsibility)
  const nextCursor =
    hasMore && users.length
      ? encodeCursor(users[users.length - 1])
      : null;

  const prevCursor =
    (after || before) && users.length
      ? encodeCursor(users[0])
      : null;

  return {
    data: users,
    meta: {
      limit,
      nextCursor,
      prevCursor,
      hasMore,
    },
  };
};




export const updateUserService = async (id: number, data: any) => {
    const updatedUser = await updateUser(id, data);
    await invalidateAnalyticsCache();
    return updatedUser;
}

export const softDeleteUserService = async (id: number) => {
    const deletedUser = await softDeleteUser(id);
    await invalidateAnalyticsCache()
    return deletedUser;
}