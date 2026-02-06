export interface FindProductQuery{
    limit?:string;
    after?:string;
    before?:string;
    search?:string;
    minPrice?:string;
    maxPrice?:string;
    isActive?:string;
}
