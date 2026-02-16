import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../products.api"
import type { ProductsQueryParams, ProductsResponse } from "../products.types"


export const useProducts = (params: ProductsQueryParams) => {
    return useQuery<ProductsResponse>({
        queryKey: [
            "products",
            params.limit ?? 5,
            params.search ?? "",
            params.minPrice ?? "",
            params.maxPrice ?? "",
            params.after ?? "",
            params.before ?? "",
        ],
        queryFn: () => getProducts(params),
        placeholderData: (previousData) => previousData,
    })
}