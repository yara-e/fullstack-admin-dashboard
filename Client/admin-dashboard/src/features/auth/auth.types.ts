export type UserRole = " ADMIN" | "MANAGER" | "USER";


export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface LoginResponse {
    token: string;
    user: User;
}