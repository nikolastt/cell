import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticateHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.sendStatus(500);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: "1d",
    });

    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};
