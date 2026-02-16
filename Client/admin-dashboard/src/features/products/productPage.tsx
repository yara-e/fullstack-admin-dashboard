import { useState } from "react";
import { useProducts } from "./hooks/useProduct";
import ProductsTable from "./components/productTable";
import { Button } from "@/components/ui/button";
import ProductsFilters from "./components/ProductsFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersSkeleton from "../users/components/UsersSkeleton";
 

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [after, setAfter] = useState<string>();
  const [before, setBefore] = useState<string>();

  const { data, isLoading } = useProducts({
    limit: 5,
    search,
    minPrice,
    maxPrice,
    after,
    before,
  });

  const resetCursor = () => {
    setAfter(undefined);
    setBefore(undefined);
  };

  return (
    <div className="space-y-6">

       <h1 className="text-2xl font-semibold">Products Management</h1>

<Card>
   <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
<CardContent className="space-y-6">

 <ProductsFilters
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        resetCursor={resetCursor}
      />
 
      {isLoading ? (
        <UsersSkeleton />
      ) : (
        <>
          <ProductsTable products={data?.data ?? []} />

          <div className="flex justify-between">
            <Button
              disabled={!data?.meta.prevCursor}
              onClick={() => {
                setBefore(data?.meta.prevCursor ?? undefined);
                setAfter(undefined);
              }}
            >
              Previous
            </Button>

            <Button
              disabled={!data?.meta.nextCursor}
              onClick={() => {
                setAfter(data?.meta.nextCursor ?? undefined);
                setBefore(undefined);
              }}
            >
              Next
            </Button>
          </div>
        </>
      )}

</CardContent>


</Card>
     
    </div>
  );
}
