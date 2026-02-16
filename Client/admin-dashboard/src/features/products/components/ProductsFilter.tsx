
import { Input } from "@/components/ui/input";
import CreateProductModal from "./CreateProductModal";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  minPrice?: number;
  maxPrice?: number;
  setMinPrice: (v?: number) => void;
  setMaxPrice: (v?: number) => void;
  resetCursor: () => void;
}

export default function ProductsFilters({
  search,
  setSearch,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  resetCursor,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          resetCursor();
        }}
       className="md:w-72"
      />

      <Input
        type="number"
        placeholder="Min Price"
        value={minPrice ?? ""}
        onChange={(e) => {
          setMinPrice(
            e.target.value ? Number(e.target.value) : undefined
          );
          resetCursor();
        }}
         className="md:w-72"
      />

      <Input
        type="number"
        placeholder="Max Price"
        value={maxPrice ?? ""}
        onChange={(e) => {
          setMaxPrice(
            e.target.value ? Number(e.target.value) : undefined
          );
          resetCursor();
        }}
        className="md:w-72"
      />

       <CreateProductModal   />
    </div>
  );
}
