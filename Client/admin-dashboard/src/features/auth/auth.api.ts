import { api } from "../../services/api/axios"
import type { LoginResponse } from "@/features/auth/auth.types"

export const LoginApi = async (email: string, password: string) => {
    const response = await api.post<LoginResponse>("/auth/login", { email, password })
    return response.data;
}