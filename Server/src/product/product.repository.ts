import {prisma} from "../common/db/client"

interface FindProductsParams{
 limit:number;
    after?:{createdAt:Date;id:number} | null;
    before?:{createdAt:Date;id:number} | null;
    search?:string;
    minPrice?:number;
    maxPrice?:number;
    isActive?:boolean;
}
export const findProducts = async ({
    limit,
    after,
    before,
    search,
    minPrice,
    maxPrice,
    isActive,}: FindProductsParams) => {
        
    const isBackward = Boolean(before);
    const cursor = after ?? before;  // asign var to first value that is not null or undefined.
   const where: any = {
        isDeleted: false,
      };

  if (search) {
    where.name= { contains: search, mode: "insensitive" } 
    
  }
 if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  
  if (isActive !== undefined) {
    where.isActive = isActive;
  }

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
  const products = await prisma.product.findMany({
    where,
    take: limit,
    orderBy: [
      { createdAt: isBackward ? "asc" : "desc" },
      { id: isBackward ? "asc" : "desc" },
    ],
  });

  // Normalize response order
  return isBackward ? products.reverse() : products;
   }

   export const createProduct =async(data:any)=>{
 return prisma.product.create({data})
   }

   export const updateProduct=async(id:number,data:any)=>{
 return prisma.product.update({
    where: {id},
    data
 }) 
   }

  export const softDeleteProduct = async (id: number) => {
  return prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
}