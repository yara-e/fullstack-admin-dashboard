import  {findUsers , updateUser , softDeleteUser } from "./user.repository";
import { FindUsersQuery } from "./user.types";
 import { decodeCursor, encodeCursor } from "../common/utils/cursor"
import { invalidateAnalyticsCache } from "../analytics/cacheInvalidations";
import AppError from "../common/error/appError";

export const getUsersService = async (query: FindUsersQuery) => {
  const limit = Math.min(Number(query.limit) || 10, 100);

  // decode cursor
  const after = query.after ? decodeCursor(query.after) : undefined;
  const before = query.before ? decodeCursor(query.before) : undefined;

  if (after && before) throw new AppError("Cannot use both 'after' and 'before'");

  // fetch limit + 1
  const users = await findUsers({
    limit: limit + 1,
    after,
    before,
    search: query.search,
    role: query.role,
  });

  const hasMore = users.length > limit;
  if (hasMore) users.pop();

  // cursors
  let nextCursor: string | null = null;
  let prevCursor: string | null = null;

  if (after) {
    nextCursor = hasMore ? encodeCursor(users[users.length - 1]) : null;
    prevCursor = users.length ? encodeCursor(users[0]) : null;
  } else if (before) {
    nextCursor = users.length ? encodeCursor(users[users.length - 1]) : null;
    prevCursor = hasMore ? encodeCursor(users[0]) : null;
  } else {
    // first page
    nextCursor = hasMore ? encodeCursor(users[users.length - 1]) : null;
    prevCursor = null;
  }

  return {
    data: users,
    meta: { limit, nextCursor, prevCursor, hasMore },
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