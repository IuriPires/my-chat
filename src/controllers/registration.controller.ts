import type { Request, Response } from "express";
import knex from "../config/postgres.config";
import { hashPassword } from "../utils/passwordManager";
import { v4 as uuid } from "uuid";
import sendEmail from "../config/email.config";
import Mail from "../lib/Mail";

const registrationController = async (req: Request, res: Response) => {
  const { name, email, password, username, birthDate, gender } = req.body;

  if (!email || !password || !username || !birthDate || !gender) {
    return res.status(400).send("Missing required fields");
  }
  const alreadyExists = await knex("users").where({ email }).first();

  if (alreadyExists) {
    return res.status(400).send("Email already registred");
  }

  const hashedPassword = await hashPassword(password);

  try {
    await knex("users").insert({
      id: uuid(),
      email,
      password: hashedPassword,
      username,
      name,
      birth_date: birthDate,
      gender,
    });

    await Mail.sendMail({
      from: "Queue Test <queue@queuetest.com.br>",
      to: `iuripires.work@gmail.com`,
      subject: "Cadastro de usuário",
      html: `<p>Olá Another, seja bem vindo ao sistema de cadastro de usuários</p>`,
    });

    return res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export default registrationController;

// TODO
// 1 - Create user
