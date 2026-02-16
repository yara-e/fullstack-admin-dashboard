import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  price: z.number().min(0),
  stock: z.number().min(0),
  
});

export type ProductFormValues = z.infer<typeof productSchema>;
