import { api } from "@/services/api/axios"
import type { UsersResponse, UsersQueryParams, User } from "./users.types";

export const getUsers = async (params: UsersQueryParams): Promise<UsersResponse> => {
  const res = await api.get("/users", { params });
  return res.data; // must return data only
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};