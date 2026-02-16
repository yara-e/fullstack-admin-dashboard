 import DeleteProductDialog from "./DeleteProductDialog"
 import { Button } from  "../../../components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import type { Product } from './../products.types';
import EditProductModal from "./EditProductModal";

const ProductActionsDropdown = ({product}:{product : Product}) => {
  return (
     <DropdownMenu>
     
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" size="icon">
               <MoreHorizontal className="h-4 w-4" />
             </Button>
           </DropdownMenuTrigger>
     
           <DropdownMenuContent align="end">
     
             {/* Edit */}
             <DropdownMenuItem  asChild onSelect={(e) => e.preventDefault()}>
               <div>
                 <EditProductModal product={product}/> 
               </div>
             </DropdownMenuItem>
     
             {/* Delete */}
             <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
               <div>
                 <DeleteProductDialog
                   id={product.id}
/>
               </div>
             </DropdownMenuItem>
     
           </DropdownMenuContent>
         </DropdownMenu>
  )
}

export default ProductActionsDropdown