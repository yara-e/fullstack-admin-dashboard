// src/product/product.routes.ts
import { Router } from "express";
import {
  getProductsHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./product.controller";
import { authenticate as authMiddleware } from "../common/middleware/auth.middleware";
import { allowRoles as requireRole } from "../common/middleware/role.middleware";

const Productrouter = Router();

Productrouter.get("/", authMiddleware, requireRole("ADMIN", "MANAGER"), getProductsHandler);
Productrouter.post("/", authMiddleware, requireRole("ADMIN", "MANAGER"), createProductHandler);
Productrouter.patch("/:id", authMiddleware, requireRole("ADMIN", "MANAGER"), updateProductHandler);
Productrouter.delete("/:id", authMiddleware, requireRole("ADMIN", "MANAGER"), deleteProductHandler);

export default Productrouter;
