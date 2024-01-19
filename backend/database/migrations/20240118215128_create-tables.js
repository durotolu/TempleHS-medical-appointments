/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("email").unique().notNullable();
      tbl.date("date_of_birth").notNullable();
      tbl.string("password").notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("doctors", (tbl) => {
      tbl.increments();
      tbl.string("name", 255).notNullable().unique();
      tbl.string("title", 255).notNullable();
      tbl.text("bio").notNullable();
      tbl.boolean("in_person").defaultTo(false);
      tbl.text("photo");
      tbl.timestamps(true, true);
    })
    .createTable("appointments", (tbl) => {
      tbl.increments();
      tbl.datetime("appointment");
      tbl
        .integer("doctor_id")
        .unsigned()
        .references("id")
        .inTable("doctors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .nullable();
      tbl.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("appointments")
    .dropTableIfExists("doctors")
    .dropTableIfExists("users");
};
