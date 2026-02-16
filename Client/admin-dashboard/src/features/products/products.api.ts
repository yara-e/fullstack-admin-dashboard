import { api } from "@/services/api/axios"
import type { Product , ProductsResponse , ProductsQueryParams } from "./products.types"

export const getProducts =async (params:ProductsQueryParams) : Promise <ProductsResponse>=>{
const res = await api.get("/product" , {params});
return res.data
}


export const createProduct = async (data: Partial<Product>)=>{
    const res=await api.post("/product" , data)
    return res.data
}

export const updateProduct = async (id: number, data: Partial<Product>) => {
  const res = await api.patch(`/product/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/product/${id}`);
  return res.data;
};