import { Application } from "express";
import { productsRoutes } from "./modules/products/route";
import { authRoutes } from "./modules/auth/route";
import { userRoutes } from "./modules/user/route";

const routes = (app: Application) => {
  app.use("/api/products", productsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
};

export { routes };
