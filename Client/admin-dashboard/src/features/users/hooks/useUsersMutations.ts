import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, deleteUser } from "../users.api";
import type { User } from "../users.types";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUser(id, data),

    onSuccess: () => {
        toast.success("user updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
     onError:()=>{
            toast.error("Updated failed")
        }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),

    onSuccess: () => {
        toast.success("user deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
     onError:()=>{
            toast.error("Deleted failed")
        }
  });
};
