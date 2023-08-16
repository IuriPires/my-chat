import type { Knex } from "knex";

// Update with your config settings.

require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: { directory: "./db/seeds" },
  },

  testing: {
    client: "pg",
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: { directory: "./db/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: { directory: "./src/db/seeds" },
  },
};

module.exports = config;
