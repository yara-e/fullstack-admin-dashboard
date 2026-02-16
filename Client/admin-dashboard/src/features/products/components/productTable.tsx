import type { Product } from "../products.types";
import ProductActionsDropdown from "./ProductActionsDropdown";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
   

  return (
    <div className="rounded-md border overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-muted">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Stock</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-3">{p.name}</td>
            <td className="p-3">${p.price}</td>
            <td className="p-3">{p.stock}</td>
            <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    p.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {p.isActive ? "Active" : "Inactive"}
                </span>
              </td>

            <td className="p-3">
               
                  <ProductActionsDropdown product={p}/>
                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
