import { Router } from "express";
import {
  createProductsHandler,
  getProductById,
  getProductsHandler,
} from "./controller";

const productsRoutes = Router();

productsRoutes.get("/", getProductsHandler);
productsRoutes.get("/:id", getProductById);
productsRoutes.post("/", createProductsHandler);

export { productsRoutes };
