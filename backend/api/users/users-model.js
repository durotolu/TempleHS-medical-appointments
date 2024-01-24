const db = require("../../database/db-config");

module.exports = {
  find,
  findById,
  add,
  findByEmail,
};

function find() {
  return db("users").select("id", "email", "date_of_birth", "password");
}

function findById(id) {
  return db("users")
    .leftJoin("appointments", "users.id", "appointments.user_id")
    .where("users.id", id)
    .select(
      // "users.email",
      "appointments.id",
      "appointments.type",
      "appointments.doctor_id",
      "appointments.appointment"
    );
}

async function add(user) {
  const isUser = findByEmail(user.email);
  // if (isUser) throw new Error("Email already exists");
  // if (isUser) return isUser;

  const [{ id }] = await db("users").insert(user, "id");
  return findById(id);
}

function findByEmail(email) {
  return db("users").where({ email }).first();
}
