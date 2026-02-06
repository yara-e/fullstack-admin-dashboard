import { UserRole } from "../generated/prisma/enums";

// export interface FindUsersQuery{
//     page?:string;
//     limit?:string;
//     search?:string;
//     role?:UserRole  
// }

export interface FindUsersQuery {
  limit?: string;
  after?: string;
  before?: string;
  search?: string;
  role?: UserRole;
}