import { prisma } from "../../db/prisma";
import { Product } from "./../../../types/product";

export const getProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};
