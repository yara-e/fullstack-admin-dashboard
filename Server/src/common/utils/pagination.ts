
export type Cursor ={
    createdAt:string;
    id:number;
}

export const getPagination = (page?: string, limit?: string) => {
    const pageNumber = Math.max(Number(page)|| 1 , 1);
    const pageSize = Math.min(Number(limit) || 10, 100);
    return {
        skip: (pageNumber - 1) * pageSize,
        take: pageSize ,
        page: pageNumber,
        limit: pageSize
    }
    
}

export const getCursorPagination = (query: any) => {
  const limit = Math.min(Number(query.limit) || 10, 100);
  return { limit, after: query.after, before: query.before };
}; 