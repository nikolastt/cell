import { Product, ResponseObject } from "../../types/product";

export const getAllProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const products = (await response.json()) as ResponseObject;
  return products;
};

export const getProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = (await response.json()) as Product;
  return product;
};
