import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../users.api";
import type { UsersResponse, UsersQueryParams } from "../users.types";

export const useUsers = (params: UsersQueryParams) => {
  return useQuery<UsersResponse>({
   queryKey: [
      "users",
      params.limit ?? 5,
      params.search ?? "",
      params.role ?? "",
      params.after ?? "",
      params.before ?? "",
    ],
    queryFn: () => getUsers(params),
   placeholderData: (previousData) => previousData,
  });
};
