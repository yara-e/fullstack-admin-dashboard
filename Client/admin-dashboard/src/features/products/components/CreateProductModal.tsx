import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "../hooks/useProductMutation";
import { useForm } from "react-hook-form";
import { productSchema } from "../schemas/productSchema";
import type { Product } from "../products.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProductModal ( ){
     const [open, setOpen] = useState(false);
    const createMutation = useCreateProduct();

    const form = useForm({
resolver : zodResolver(productSchema),
defaultValues: {
    name: "",
    price:0,
    stock:0,
},
    })

const onSubmit =(data:Partial<Product>)=>{
    createMutation.mutate(
        data
    ,
      {onSuccess: () => setOpen(false)}
    )
}

return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Product</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Label>Name</Label>
<Input {...form.register("name")} placeholder="Name"/>
<Label>Price</Label>
<Input type="number" {...form.register("price" , {valueAsNumber: true})} />
<Label>Stock</Label>
<Input type="number" {...form.register("stock" , {valueAsNumber: true})} />
 
   
    <Button type="submit" className="w-full" >
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
)

}