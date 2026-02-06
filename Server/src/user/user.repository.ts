import {prisma} from "../common/db/client";
import { UserRole } from "../generated/prisma/enums";

interface FindUsersParams{
 limit:number;
    after?:{createdAt:string;id:number} | null;
    before?:{createdAt:string;id:number} | null;
    search?:string;
    role?:UserRole;
}

export const findUsers = async ({
  limit,
  after,
  before,
  search,
  role,
}: FindUsersParams) => {
  if (after && before) {
    throw new Error("Cannot use both 'after' and 'before'");
  }

  const isBackward = Boolean(before);
  const cursor = after ?? before;  // asign var to first value that is not null or undefined.

  const where: any = {
    isDeleted: false,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (role) {
    where.role = role;
  }

  // Cursor filtering
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

  const users = await prisma.user.findMany({
    where,
    take: limit,
    orderBy: [
      { createdAt: isBackward ? "asc" : "desc" },
      { id: isBackward ? "asc" : "desc" },
    ],
  });

  // Normalize response order
  return isBackward ? users.reverse() : users;
};


export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const softDeleteUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { isDeleted: true },
  });
};