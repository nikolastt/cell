import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

import bcrypt from "bcrypt";

export const createUserHandle = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hasUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (hasUser) {
      throw new Error("User exist");
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPass,
      },
    });

    console.log("deu");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};
