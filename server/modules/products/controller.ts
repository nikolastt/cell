import { Request, Response } from "express";
import { getProducts } from "./service";
import { Product } from "@prisma/client";
import { prisma } from "../../db/prisma";

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const prodducts = await getProducts();

    res.status(200).json(prodducts);
  } catch (err) {
    console.log(err);
  }
};

export const createProductsHandler = async (req: Request, res: Response) => {
  const products = req.body as Product;

  try {
    await prisma.product.createMany({
      data: products,
    });

    return res.status(200);
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};
