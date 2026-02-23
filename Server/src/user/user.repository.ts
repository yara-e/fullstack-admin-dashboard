import {prisma} from "../common/db/client";
import { UserRole } from "../generated/prisma/enums";

interface FindUsersParams{
 limit:number;
    after?:{createdAt:Date;id:number} | null;
    before?:{createdAt:Date;id:number} | null;
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
  const isBackward = Boolean(before);
  const cursor = after ?? before;

  const where: any = { isDeleted: false };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (role) where.role = role;

  // CURSOR LOGIC
  if (cursor) {
    if (isBackward) {
      // backward: get items newer than cursor
      where.AND = [
        {
          OR: [
            { createdAt: { gt: cursor.createdAt } },
            { createdAt: cursor.createdAt, id: { gt: cursor.id } },
          ],
        },
      ];
    } else {
      // forward: get items older than cursor
      where.AND = [
        {
          OR: [
            { createdAt: { lt: cursor.createdAt } },
            { createdAt: cursor.createdAt, id: { lt: cursor.id } },
          ],
        },
      ];
    }
  }

  const users = await prisma.user.findMany({
    where,
    take: limit,
    orderBy: [
      { createdAt: isBackward ? "asc" : "desc" },
      { id: isBackward ? "asc" : "desc" },
    ],
  });

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