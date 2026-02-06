export interface FindOrderQuery{
    limit?:string;
    after?:string;
    before?:string;
    search?:string;
    status?:string;
    userId?:number;
}
