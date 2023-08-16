import type { Request, Response } from "express";
import knex from "../config/postgres.config";
import { comparePassword } from "../utils/passwordManager";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing required fields");
  }

  const user = await knex("users")
    .where({ email })
    .andWhere({ activated: true })
    .first();

  if (!user) {
    return res.status(400).send("Invalid credentials or user not found");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid credentials or user not found");
  }

  const token = jwt.sign(user, String(process.env.JWT_SECRET), {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });

  delete user.password;

  return res.status(200).json({
    ...user,
    token,
  });
}

export { auth };
