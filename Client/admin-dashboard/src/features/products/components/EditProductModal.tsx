import { zodResolver } from "@hookform/resolvers/zod";
 
import { useForm } from "react-hook-form";
import { productSchema } from "../schemas/productSchema";
import type { Product } from "../products.types";
import { Button } from "@/components/ui/button";
import { useUpdateProduct } from "../hooks/useProductMutation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function EditProductModal ( { product }: { product: Product }){
    const editMutation = useUpdateProduct()
const [open, setOpen] = useState(false);
    const form = useForm({
resolver : zodResolver(productSchema),
defaultValues: {
    name: product.name,
    price:product.price,
    stock:product.stock,
},
    })

const onSubmit =( data:Partial<Product>)=>{
    editMutation.mutate({id:product.id,data} ,
        {
        onSuccess: () => setOpen(false),
      }
    )
}

return (
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
<Input {...form.register("name")} placeholder="Name"/>
<Input type="number" {...form.register("price" , {valueAsNumber: true})} />
<Input type="number" {...form.register("stock" , {valueAsNumber: true})} />
<Button type="submit">Save Changes</Button>
    </form>
      </DialogContent>
    </Dialog>
)

}

 
