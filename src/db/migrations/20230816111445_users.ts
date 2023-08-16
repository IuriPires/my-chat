import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.text("username").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.boolean("activated").defaultTo(false);
    table.string("gender").notNullable();
    table.date("birth_date").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("users");
}
