const db = require("../database/db-config");

module.exports = {
  find,
  findById,
  add,
  findByUsername,
};

function find() {
  return db("users").select("id", "email", "date_of_birth", "password");
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}
