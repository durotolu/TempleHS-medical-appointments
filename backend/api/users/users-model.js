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
      "users.email",
      "appointments.id as appointment_id",
      "appointments.type",
      "appointments.doctor_id",
      "appointments.appointment"
    );
}

// async function add(park) {
//   const [id] = await db('parks').insert(park, 'id');

//   return findBy(id);
// }

function findDoctorById(id) {
  return db("doctors").where("id", id);
}

async function add(user) {
  const [{ id }] = await db("users").insert(user, "id");

  return findById(id);
}

function findByEmail(email) {
  return db("users").where({ email }).first();
}
