import { Product, ResponseObject } from "../../types/product";

export const getAllProducts = async () => {
  // const response = await fetch("https://dummyjson.com/products");
  console.log(process.env.EXPO_PUBLIC_API_URL);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/products`
  );
  const products = (await response.json()) as Product[];
  return products;
};

export const getProduct = async (id: number) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/products/${id}`
  );
  const product = (await response.json()) as Product;
  return product;
};
