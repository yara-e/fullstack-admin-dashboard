import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../products.api";
import type { Product } from "../products.types";
import { toast } from "sonner";

export const useCreateProduct = ()=>{
    const client =useQueryClient()
    return useMutation({
        mutationFn : createProduct,
      
        onSuccess: ()=> {
          toast.success("Product Created")
          client.invalidateQueries({queryKey :["products"] })
      
      },
      onError:()=>{
        toast.error("Created Failed")
      }

    })
}

export const useUpdateProduct = ()=>{
    const client = useQueryClient()
 return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      updateProduct(id, data),

    onSuccess: () => {
       toast.success("Product updated");
      client.invalidateQueries({ queryKey: ["products"] })
    },
    onError:()=>{
            toast.error("Updated failed")
        }
  });
};


export const useDeleteProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted")
      client.invalidateQueries({ queryKey: ["products"] })},
      onError:()=>{
            toast.error("Deleted failed")
        }
  });
};