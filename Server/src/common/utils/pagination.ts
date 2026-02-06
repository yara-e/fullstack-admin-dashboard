
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

export const getCursorPagination=(query:any)=>{
    const limit = Math.min(Number(query.limit) || 10 , 100);
const after =query.after? JSON.parse(Buffer.from(query.after , 'base64').toString()):null;
const before =query.before? JSON.parse(Buffer.from(query.before , 'base64').toString()):null;
return {limit , after , before};
} 