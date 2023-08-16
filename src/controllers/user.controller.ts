import type { Request, Response } from "express";
import knex from "../config/postgres.config";
import { hashPassword } from "../utils/passwordManager";

async function getAll(req: Request, res: Response) {
  try {
    const users = await knex("users").select(
      "id",
      "email",
      "name",
      "username",
      "gender",
      "birth_date",
      "created_at",
      "updated_at",
      "activated"
    );
    return res.status(200).json(users);
  } catch (errors) {
    console.error(errors);
    return res.status(500).send("Internal server error");
  }
}

async function updateUser(req: Request, res: Response) {
  const { name, email, password, username, birthDate, gender } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("User id is required to perform an update");
  }

  const user = await knex("users").where({ id }).first();

  if (!user) {
    return res.status(400).send("User not found");
  }

  const updatedUser = {
    ...user,
    name: name || user.name,
    gender: gender || user.gender,
    email: email || user.email,
    password: password ? await hashPassword(password) : user.password,
    username: username || user.username,
    birth_date: birthDate || user.birth_date,
  };

  try {
    await knex("users").where({ id }).update(updatedUser);

    return res.status(200).send("User updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

async function getOneUser(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("User id is required");
  }

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(400).send("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("User id is required");
  }

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(400).send("User not found");
    }

    await knex("users").where({ id }).delete();

    return res.status(200).json();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

export { updateUser, getAll, getOneUser, deleteUser };
